import ReferencesForm from "./Components/Molecules/ReferencesForm";
import GoodLordLogo from "./Components/icons/GoodLordLogo";


export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-veryDarkBlue pb-10">
      <div className="w-full pl-10">
        <GoodLordLogo size="150"/>
      </div>
      <div className="w-1/2 h-85P overflow-y-scroll flex flex-col items-center bg-white rounded-lg py-10">
        <ReferencesForm />
      </div>
    </main>
  );
};
