import TeachingCasePreview from "./components/TeachingCasePreview";
import Header from "./components/Header";
import WelcomeSection from "./components/WelcomeSection";
import AiToolsOverview from "./components/AiToolsOverview";
import AiToolsStartSection from "./components/AiToolsStartSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <WelcomeSection />
      <TeachingCasePreview />
      <AiToolsStartSection />
      <AiToolsOverview />
      <Footer />
    </div>
  );
}
