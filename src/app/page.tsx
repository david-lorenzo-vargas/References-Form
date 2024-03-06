import ReferencesForm from "./Components/Molecules/ReferencesForm";
import GoodLordLogo from "./Components/icons/GoodLordLogo";

const Home = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-veryDarkBlue pb-10">
      <div className="w-full pl-10">
        <GoodLordLogo size="150"/>
      </div>
      <div className="md:w-1/2 w-85P h-85P overflow-y-auto flex flex-col items-center bg-white rounded-lg py-10">
        <ReferencesForm />
      </div>
    </main>
  );
};

export default Home;
