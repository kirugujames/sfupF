"use client"

export function TeamSection() {
  const team = [
    {
      name: "Chairperson",
      title: "Party Leader",
      description: "Leading the party with vision and integrity towards a united Tanzania.",
      image: "/political-leader.png",
    },
    {
      name: "Secretary General",
      title: "Executive Administration",
      description: "Ensuring smooth operations and implementation of party policies and initiatives.",
      image: "/government-official.jpg",
    },
    {
      name: "Treasurer",
      title: "Financial Stewardship",
      description: "Managing party resources with transparency and accountability.",
      image: "/professional-administrator.jpg",
    },
    {
      name: "Communications Director",
      title: "Public Engagement",
      description: "Communicating our vision and values to citizens across the nation.",
      image: "/communications-specialist.jpg",
    },
  ]

  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Leadership Team</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Dedicated individuals committed to serving our nation with integrity and purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 rounded-lg overflow-hidden border border-border">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-secondary font-semibold mb-3">{member.title}</p>
              <p className="text-foreground/70 text-sm leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
