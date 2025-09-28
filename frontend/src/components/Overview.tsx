import * as Tabs from "@radix-ui/react-tabs";
import { Header } from "./Header";
import Setup from "../Setup";
import { Dashboard } from "../pages/Dashboard";

export default function Overview() {
  return (
    <Tabs.Root defaultValue="setup" className="h-screen w-screen flex flex-col">
      {/* Header has the tab triggers */}
      <Header />

      {/* Content switches here */}
      <Tabs.Content value="setup" className="flex-1 overflow-auto">
        <Setup />
      </Tabs.Content>

      <Tabs.Content value="overview" className="flex-1 overflow-auto">
        <Dashboard />
      </Tabs.Content>
    </Tabs.Root>
  );
}