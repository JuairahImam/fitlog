import { MyPlan } from "./MyPlan";

export default async function MyPlanPage({ searchParams }: PageProps<"/my-plan">) {
  const { tab } = await searchParams;
  return <MyPlan key={String(tab)} initialTab={tab === "saved" ? "saved" : "plan"} />;
}
