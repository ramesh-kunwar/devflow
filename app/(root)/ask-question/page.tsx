import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";

const AskQuestion = () => {
  const { userId } = auth();

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a quesiton</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};
export default AskQuestion;
