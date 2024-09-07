import Mainbanner from "@/components/layout/main-banner";
import Navbar  from "../../components/layout/navbar";
import { fetchPopularMovies } from "@/lib/api/api-movies";

export default function Layout(
  {
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <section>
        <Navbar/>
        {children}
    </section>
  );
}