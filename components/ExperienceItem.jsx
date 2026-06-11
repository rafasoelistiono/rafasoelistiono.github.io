import AnimatedReveal from "@/components/AnimatedReveal";

export default function ExperienceItem({ item, index = 0 }) {
  return (
    <AnimatedReveal as="article" className="experience-item" delay={index * 70}>
      <div>
        <span className="item-index">{String(index + 1).padStart(2, "0")}</span>
        <p className="eyebrow">
          {item.startDate} - {item.endDate} / {item.location}
        </p>
      </div>
      <div>
        <h3>{item.role}</h3>
        <p className="experience-company">{item.company}</p>
        <p>{item.description}</p>
        {item.highlights?.length ? (
          <ul>
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </AnimatedReveal>
  );
}
