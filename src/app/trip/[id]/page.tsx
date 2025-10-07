'use client';
import { useEffect, useState } from 'react';
import { usePuterStore } from '@/app/lib/puter';
import Loader from '@/app/components/Loader';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Lightbulb, MapPin, Utensils, Info } from 'lucide-react';

type TripPageProps = {
  params: {
    id: string;
  };
};

export default function TripPage({ params }: TripPageProps) {
  const { id } = params;
  const { kv, puterReady } = usePuterStore();

  const [tripData, setTripData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!puterReady) return;

    const fetchTrip = async () => {
      try {
        const data = await kv.get(`travel:${id}`);
        if (data) setTripData(JSON.parse(data));
      } catch (e) {
        console.error('FAILED PARSING OR FETCH:', e);
        setTripData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrip();
  }, [id, kv, puterReady]);

  if (isLoading) return <Loader />;

  if (!tripData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-gray-700">Trip not found.</p>
        <Button asChild>
          <Link href="/">Go back</Link>
        </Button>
      </div>
    );
  }

  const { destination, feedback } = tripData;
  const itinerary = feedback?.itinerary || [];
  const tipsAndRecommendations = feedback?.tipsAndRecommendations || {};

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between bg-white p-4 shadow-sm">
        <span className="text-lg font-bold">
          {' '}
          <Link href="/">Travel Dashboard</Link>
        </span>
      </header>

      <div className="mx-auto w-full max-w-6xl p-6">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">{destination}</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2 bg-[#fafafa] shadow-lg">
            <CardContent className="p-5">
              <h3 className="mb-4 text-2xl font-semibold text-gray-700">
                Itinerary
              </h3>
              <div className="space-y-4">
                {itinerary.map((day: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-[#fefefe] p-4 shadow-lg hover:shadow-xl"
                  >
                    <h4 className="font-medium text-gray-700">Day {day.day}</h4>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <strong>🌅 Morning:</strong> {day.morning}
                      </div>
                      <div>
                        <strong>🌞 Afternoon:</strong> {day.afternoon}
                      </div>
                      <div>
                        <strong>🌙 Evening:</strong> {day.evening}
                      </div>
                    </div>
                    {day.hiddenGem && (
                      <p className="mt-2 text-gray-500 italic">
                        💎 {day.hiddenGem.name}: {day.hiddenGem.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 bg-[#fafafa] shadow-lg">
            <CardContent className="p-6">
              <h3 className="mb-5 flex items-center gap-2 text-2xl font-semibold">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Travel Tips & Recommendations
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(tipsAndRecommendations).map(([cat, tips]) => (
                  <div
                    key={cat}
                    className="rounded-xl border border-blue-100 bg-[#fefefe] p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center gap-2 text-blue-600">
                      {cat.toLowerCase().includes('food') ? (
                        <Utensils className="h-4 w-4" />
                      ) : cat.toLowerCase().includes('place') ? (
                        <MapPin className="h-4 w-4" />
                      ) : (
                        <Info className="h-4 w-4" />
                      )}
                      <h4 className="text-sm font-semibold capitalize">
                        {cat}
                      </h4>
                    </div>

                    <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
                      {(tips as string[]).map((tip, idx) => (
                        <li key={idx} className="leading-snug">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
