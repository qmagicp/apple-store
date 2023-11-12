import Header from "@/components/Header";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="relative h-[200vh] bg-[#E7ECEE]">
        <Landing />
      </main>
    </div>
  );
}
