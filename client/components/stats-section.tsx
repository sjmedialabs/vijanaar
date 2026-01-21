type Stats = {
  value1: string
  description1: string
  value2: string
  description2: string
  value3: string
  description3: string
  value4: string
  description4: string
}

interface StatsSectionProps {
  data: Stats
}

export default function StatsSection({ data }: StatsSectionProps) {
  const stats = [
    { number: data.value1, label: data.description1 },
    { number: data.value2, label: data.description2 },
    { number: data.value3, label: data.description3 },
    { number: data.value4, label: data.description4 },
  ]

  return (
    <section className="bg-[#FF6B35] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
