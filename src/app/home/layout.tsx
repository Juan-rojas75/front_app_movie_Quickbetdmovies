import Navbar  from "../../components/layout/navbar";


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