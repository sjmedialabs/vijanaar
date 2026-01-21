"use client"

type Story = {
  imageUrl: string
  name: string
  role: string
  companyLogoUrl: string
  package: number
  description1: string // HTML from CKEditor
  description2: string // HTML from CKEditor
}

type Corporate = {
  title: string
  stories: Story[]
}

interface CorporateTrainingSuccessProps {
  data: Corporate
}

export default function CorporateTrainingSuccess({ data }: CorporateTrainingSuccessProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p
            className="mb-2"
            style={{
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "18px",
              color: "#2F5596",
            }}
          >
            Success Stories
          </p>
          <h2
            className="text-xl md:text-2xl font-semibold tracking-tight uppercase"
            style={{
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "23px",
              color: "#27AAE1",
            }}
          >
            {data.title}
          </h2>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.stories.slice(0, 3).map((story, idx) => (
            <div
              key={idx}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{
                boxSizing: "border-box",
                background: "#FFFFFF",
                boxShadow: "0px 0px 11px rgba(0, 0, 0, 0.15)",
                borderRadius: "30px",
              }}
            >
              {/* Card Content */}
              <div className="p-6 pb-0">
                <div className="text-center mb-4">
                  <div className="flex justify-center mb-2">
                    <img src={story.imageUrl} alt="Congratulations!" className="h-12" />
                  </div>
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#1A4886",
                    }}
                  >
                    {story.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#959596",
                    }}
                  >
                    {story.role}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <img src={story.companyLogoUrl} alt="Company Logo" className="w-12 h-12" />
                    <div>
                      <p className="text-[#27aae1] font-bold text-sm">Salary package</p>
                      <p className="text-[#27aae1] font-bold">{story.package} LPA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CKEditor Description 1 */}
              <div className="text-center py-3 w-full" style={{ background: "#27AAE1" }}>
                <div
                  className="text-white text-xs prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: story.description1 }}
                />
              </div>

              {/* CKEditor Description 2 */}
              <div className="text-center py-3 w-full" style={{ background: "#fcb040" }}>
                <div
                  className="text-white text-xs prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: story.description2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
