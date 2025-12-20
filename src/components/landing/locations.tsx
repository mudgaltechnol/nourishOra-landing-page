export default function Locations() {
  const locations = [
    {
      number: '1',
      places: 'JMD Megapolis, Welldone Tech Park, IRIS Tech Park',
    },
    {
      number: '2',
      places: 'Spaze I-Tech Park, Bestech Business Park',
    },
    {
      number: '3',
      places: 'Vatika Business Park, Candor Techspace',
    },
    {
      number: '4',
      places: 'More Towers Near these Towers',
    },
  ];

  return (
    <section id="locations" className="w-full bg-[#1E2E2C] text-white py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-sm font-medium uppercase tracking-wider text-secondary">
            Initial Pilot Launch
          </div>
          <h2 className="font-headline mt-2 text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Built for Tech Professionals by Tech Professionals
          </h2>
           <p className="mt-4 text-zinc-300 md:text-lg">
            We're starting small and expanding quickly. Your locality is next
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8">
          {locations.map((location) => (
            <div key={location.number} className="flex gap-6">
              <div className="font-headline text-6xl font-bold text-white">
                {location.number}
              </div>
              <div className="pt-2">
                <p className="text-lg text-zinc-300">{location.places}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
