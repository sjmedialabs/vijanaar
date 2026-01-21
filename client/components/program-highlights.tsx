type HighlightItem = {
  imageUrl: string
  title: string
  description: string // stored as HTML from CKEditor
}

type Highlights = {
  title: string
  subTitle: string
  highlights: HighlightItem[]
}

interface ProgramHighlightsProps {
  data: Highlights
}

export default function ProgramHighlights({ data }: ProgramHighlightsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-gray-600 font-medium mb-2">{data.subTitle}</p>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight uppercase text-[#4A90E2] mb-4">
            {data.title}
          </h2>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon / Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={highlight.imageUrl || "/placeholder.svg"}
                  alt={highlight.title}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-[#FF6B35] font-bold text-sm mb-3 leading-tight">
                {highlight.title}
              </h3>

              {/* Description (HTML from CKEditor) */}
              <div
                className="text-gray-600 text-sm leading-relaxed prose max-w-none"
                dangerouslySetInnerHTML={{ __html: highlight.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
