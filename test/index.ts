import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});

const srcContext = require.context('../src', true, /\.[tj]sx?$/);
srcContext.keys().forEach(srcContext);

const testsContext = require.context('./', true, /\.spec\.[tj]sx?/);
testsContext.keys().forEach(testsContext);