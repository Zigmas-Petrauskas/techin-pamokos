import BasicConditional from './components/BasicConditional';
import MultipleStates from './components/MultipleStates';
import ConditionalElements from './components/ConditionalElements';
import RoleBasedRendering from './components/RoleBasedRendering';
import DynamicTasks from './components/DynamicTasks';
import NotificationExample from './components/Notification';
import ConditionalForm from './components/ConditionalForm';
import ModalExample from './components/ModalExample';
import ConditionalTabs from './components/ConditionalTabs';
import FeatureFlags from './components/FeatureFlags';

// Pagrindinis programos komponentas.
const App = () => {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">React Conditional Rendering Exercises</h1>

      <div className="grid grid-cols-2 gap-[0.8rem]">
        <BasicConditional />
        <MultipleStates />
        <ConditionalElements />
        <RoleBasedRendering />
        <DynamicTasks />
        <NotificationExample />
        <ConditionalForm />
        <ModalExample />
        <ConditionalTabs />
        <FeatureFlags />
      </div>
    </main>
  );
};

export default App;
