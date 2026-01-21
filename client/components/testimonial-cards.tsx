interface TestimonialCardProps {
  imageUrl: string;
  name: string;
  role: string;
  description: string; // contains HTML
}

export default function TestimonialCard({
  imageUrl,
  name,
  role,
  description,
}: TestimonialCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-start shadow-md p-6"
      style={{
        width: "320px",
        height: "446px",
        borderRadius: "29px",
        border: "2px solid #F57F20",
        opacity: 1,
      }}
    >
      {/* Avatar */}
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: "80px",
          height: "80px",
          border: "3px solid #FFF",
          borderRadius: "50%",
          marginBottom: "20px",
        }}
      />

      {/* Name */}
      <h4
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "19px",
          lineHeight: "100%",
          color: "#F57F20",
          padding: "6px 12px",
          borderRadius: "6px",
        }}
      >
        {name}
      </h4>

      {/* Role */}
      <p
        className="mt-2 px-3 py-1 rounded"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "19px",
          color: "#000000",
        }}
      >
        {role}
      </p>

      <div className="h-[1px] w-full bg-[#D7D7D7] mt-4"></div>

      {/* Description (HTML content) */}
      <p
        className="mt-4 px-3 py-3 rounded flex-1"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "20px",
          color: "#454545",
          textAlign: "center",
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
