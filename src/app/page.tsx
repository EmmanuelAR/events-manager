import { AmbassadorsView } from "@/components/AmbassadorsView";
import { CommunityStrip } from "@/components/CommunityStrip";
import { EventList } from "@/components/EventList";
import { Hero } from "@/components/Hero";
import { getAllAmbassadors } from "@/lib/ambassadors/load";
import { getCommunityConfig } from "@/lib/community/load";
import { getPastEvents, getUpcomingEvents } from "@/lib/events/load";
import styles from "./page.module.css";

export default async function HomePage() {
  const [upcoming, past, community, ambassadors] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
    getCommunityConfig(),
    getAllAmbassadors(),
  ]);

  return (
    <>
      <Hero />
      <section id="eventos" className={styles.eventsSection}>
        <div className="site-shell">
          <EventList upcoming={upcoming} past={past} />
        </div>
      </section>
      <CommunityStrip whatsappUrl={community.whatsappUrl} />
      <AmbassadorsView ambassadors={ambassadors} />
    </>
  );
}
