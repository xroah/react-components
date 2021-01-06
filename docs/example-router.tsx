import * as React from "react"
import {
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom"
import routes from "./example-routes"
import Loading from "./components/Loading"

function _Loading(props: { mountCallback?: Function }) {
    React.useEffect(() => () => {
        props.mountCallback && props.mountCallback()
    })

    return <Loading />
}

let prevPath = ""
let loaded: any = {}
let currentComponent: any

export default () => {
    const location = useLocation()
    const path = location.pathname
    const [, update] = React.useState()
    const fallback = (
        <_Loading
            mountCallback={
                () => {
                    loaded[path] = currentComponent
                    //force render the component once loaded(replace the previous component)
                    update(Math.random() as any)
                }
            } />
    )

    if (!location.pathname.includes("/components")) {
        prevPath = ""
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
                                const Component = item.component
                                const prev = loaded[prevPath]
                                const cur = loaded[path]
                                const suspense = (
                                    <React.Suspense fallback={fallback}>
                                        <Component />
                                    </React.Suspense>
                                )
                                currentComponent = suspense

                                if (cur || prev) {
                                    document.title = `${item.name}--reap-ui`
                                }
                                
                                if (cur) {
                                    prevPath = path

                                    if (!location.hash) {
                                        window.scrollTo(0, 0)
                                    }

                                    return cur
                                }
                                else if (prev) {
                                    //render the prev component until current has been loaded
                                    return (
                                        <>
                                            {prev}
                                            {/* load current component while rendering previous */}
                                            {suspense}
                                        </>
                                    )
                                }

                                return suspense
                            }} />
                    )
                })
            }
            <Redirect to="/components/alert" />
        </Switch>
    )
}
