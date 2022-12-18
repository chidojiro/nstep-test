import './styles/globals.css';

import reactLogo from './assets/react.svg';
import tailwindLogo from './assets/tailwind.svg';
import reactQueryLogo from './assets/react-query.svg';

import { Countdown } from './features/countdown';
import { CountdownMenu } from './features/countdownMenu';
import { Divider, NstButton, NstDropdown, NstPopover } from './components';

function App() {
  return (
    <main className="max-w-[1200px] w-full mx-auto p-10">
      <div className="flex flex-col items-center justify-center flex-1">
        <header className="flex gap-4">
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src="/vite.svg" alt="Vite logo" className="w-16 h-16" />
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            <img src={reactLogo} alt="React logo" className="w-16 h-16" />
          </a>
          <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">
            <img src={tailwindLogo} alt="Tailwind logo" className="w-16 h-16" />
          </a>
          <a href="https://tanstack.com/query" target="_blank" rel="noreferrer">
            <img src={reactQueryLogo} alt="React Query logo" className="w-16 h-16" />
          </a>
        </header>
        <h1 className="my-8">NStep Frontend Challenge</h1>

        <Countdown />
        <CountdownMenu />

        <p className="mt-8">
          See <code>README.md</code> in each folder.
        </p>
        <p>You can use this page as the final showcase your awesome stuff 🎉</p>
      </div>

      <Divider className="my-4" />

      <h3>Popover</h3>
      <div>
        <NstPopover trigger={<NstButton className="mt-2">Toggle Popover</NstButton>}>
          There&apos;s nothing here
        </NstPopover>
      </div>

      <Divider className="my-4" />

      <h3>Dropdown</h3>
      <p className="text-gray-400">Please check devtool console to see clicked action</p>
      <div>
        <NstDropdown trigger={<NstButton className="mt-2">Toggle Dropdown</NstButton>}>
          <NstDropdown.Item onClick={() => console.log('Action 1 was clicked!')}>
            Action 1
          </NstDropdown.Item>
          <NstDropdown.Item onClick={() => console.log('Action 2 was clicked!')}>
            Action 2
          </NstDropdown.Item>
          <NstDropdown.Item onClick={() => console.log('Action 3 was clicked!')}>
            Action 3
          </NstDropdown.Item>
        </NstDropdown>
      </div>
    </main>
  );
}

export default App;
