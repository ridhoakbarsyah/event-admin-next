import adminUserSeeder from "./adminUserSeeder";
import categorySeeder from "./categorySeeder";
import eventSeeder from "./eventSeeder";
import FaqSeeder from "./faqSeeder";
import participantSeeder from "./participantSeeder";
import { citySeeder, districtSeeder, provinceSeeder, villageSeeder } from "./placesSeeder";
import settingSeeder from "./settingSeeder";
import sponsorSeeder from "./sponsorSeeder";

// Call seeding functions sequentially
async function seed() {
  await settingSeeder();
  await eventSeeder();
  await categorySeeder();
  await sponsorSeeder();
  await provinceSeeder();
  await citySeeder();
  await districtSeeder();
  await villageSeeder();
  await participantSeeder();
  await adminUserSeeder();
  await FaqSeeder();
}

// Run seeding
seed();
