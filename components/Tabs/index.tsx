import Tabs from "./Tabs";
import TabPane from "./TabPane";

type TabsType = typeof Tabs & {TabPane: typeof TabPane};

const _Tabs = Tabs as TabsType;

_Tabs.TabPane = TabPane;

export default _Tabs;