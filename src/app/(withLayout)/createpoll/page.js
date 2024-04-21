import CreatePoll from "@/Component/createPoll/CreatePoll";

const page = () => {
  return (
    <div>
      <div className="text-white text-center pt-24">
        <h2 className="text-4xl font-bold pb-2">Create a Poll</h2>
        <p className="text-sm">Complete the below fields to create your poll.</p>
      </div>
      <CreatePoll />
    </div>
  );
};

export default page;
