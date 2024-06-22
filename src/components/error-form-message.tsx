export default function ErrorFormMessage({
  errorMessage,
}: {
  errorMessage: string[] | string;
}) {
  return (
    <div className="p-1 px-2 text-sm bg-red-300 border border-red-500 rounded-lg">
      {typeof errorMessage === "string" && errorMessage}
      {typeof errorMessage !== "string" && errorMessage.join(", ")}
    </div>
  );
}
