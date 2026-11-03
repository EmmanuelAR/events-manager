import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="site-shell section" style={{ paddingTop: "4rem" }}>
      <h1 className="section-title">No está esta página</h1>
      <p className="section-lead">Puede que el link esté viejo o el evento no exista.</p>
      <Button href="/">Volver al inicio</Button>
    </div>
  );
}
