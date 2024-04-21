import Protected from "@/Component/Protected/Protected";
import HomePage from "../page";

const page = () => {
  return (
    <div>
      <Protected>
        <HomePage />
      </Protected>
    </div>
  );
};

export default page;
