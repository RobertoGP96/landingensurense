type Props = {
  title: string;
  body: string;
};

export default function SuccessState({ title, body }: Props) {
  return (
    <div className="text-center" style={{ padding: "60px 0" }}>
      <div className="serif-it" style={{ fontSize: 56, color: "var(--color-sky-ink)" }}>
        {title}
      </div>
      <p
        style={{
          marginTop: 16,
          color: "var(--color-ink-soft)",
          fontSize: 15,
          maxWidth: 420,
          marginInline: "auto",
          lineHeight: 1.55,
        }}
      >
        {body}
      </p>
    </div>
  );
}
