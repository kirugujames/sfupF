"use client"

import { Heart, Users, Scale, Lightbulb } from "lucide-react"

export function ValuesSection() {
  const values = [
    {
      icon: Heart,
      title: "Unity",
      description: "We believe in bringing together diverse voices and perspectives to build a stronger nation.",
    },
    {
      icon: Scale,
      title: "Justice",
      description: "Equal treatment and fair opportunities for all citizens regardless of background or status.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Collaborative efforts and grassroots engagement to solve challenges together.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Forward-thinking solutions to modern challenges while respecting our traditions.",
    },
  ]

  return (
    <section className="w-full py-8 md:py-12 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Core Values</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            These principles guide every decision and action we take as a party and organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="bg-background p-6 rounded-lg border border-border hover:border-secondary transition-colors"
              >
                <div className="bg-secondary p-3 rounded-lg mb-4 w-fit">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
