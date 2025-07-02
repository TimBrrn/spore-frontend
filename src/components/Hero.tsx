import { AddSampleModal } from "./CreateSampleModal";

export const Hero = () => {
  return (
    <div className="mb-15 flex w-full justify-between text-center">
      <div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          Samples Dashboard
        </h1>
      </div>
      <AddSampleModal />
    </div>
  );
};
