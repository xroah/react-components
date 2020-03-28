import * as React from "react";
import {
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom";;
import routes from "./routes";
import Loading from "./components/Loading";
import scrollIntoView from "./scrollIntoView";

function _Loading(props: { unmountCallback?: Function }) {
    React.useEffect(() => () => {
        props.unmountCallback && props.unmountCallback();
    });

    return <Loading />;
}

let prevPath = "";
let loaded: any = {};
let currentComponent: any;
let isFirst = true; //第一次进入页面

export default () => {
    const location = useLocation();
    const path = location.pathname;
    const [needUpdate, update] = React.useState();
    const fallback = (
        <_Loading
            unmountCallback={
                () => {
                    loaded[path] = currentComponent;
                    //force render the component once loaded(replace the previous component)
                    update(Math.random() as any);
                }
            } />
    );

    if (!location.pathname.includes("/components")) {
        prevPath = "";
    }

    return (
        <Switch location={location}>
            {
                routes.map(item => {
                    return (
                        <Route
                            key={item.path}
                            path={item.path}
                            exact
                            render={() => {
                                const Component = item.component;
                                const prev = loaded[prevPath];
                                const cur = loaded[path];
                                const suspense = (
                                    <React.Suspense fallback={fallback}>
                                        <Component />
                                    </React.Suspense>
                                );
                                currentComponent = suspense;

                                //render the prev component until current has been loaded
                                if (cur) {
                                    prevPath = path;

                                    if (isFirst) {
                                        isFirst = false;
                                    } else {
                                        if (location.hash) {
                                            scrollIntoView(location.hash);
                                        } else {
                                            window.scrollTo(0, 0);
                                        }
                                    }

                                    return cur;
                                } else if (prev) {
                                    return (
                                        <>
                                            {prev}
                                            {/* load current component when rendering previous */}
                                            {suspense}
                                        </>
                                    );
                                }

                                return suspense;
                            }} />
                    );
                })
            }
            <Redirect to="/components/alert" />
        </Switch>
    );
}
