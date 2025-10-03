'use client';

import { useState, useEffect } from 'react';
import { usePuterStore } from '../lib/puter';
import { prepareInstructions } from '../constants';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

const travelStyles = [
  'Budget',
  'Luxury',
  'Backpacking',
  'Cultural',
  'Adventure',
  'Romantic',
  'Family',
  'Foodie',
];

export default function FormTravel() {
  const router = useRouter();
  const { kv, ai } = usePuterStore();
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [cityQuery, setCityQuery] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedCity, setSelectedCity] = useState('');

  // debounce query
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (cityQuery.length < 2) return;

      try {
        const res = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityQuery}&minPopulation=100000&limit=5`,
          {
            headers: {
              'x-rapidapi-key': process.env.ApiCity || '',
              'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            },
          }
        );
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setCitySuggestions(
            data.data.map((c: any) => ({
              id: c.id,
              name: `${c.name}, ${c.country}`,
            }))
          );
        } else {
          setCitySuggestions([]);
        }
      } catch (err) {
        console.error('City fetch failed', err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [cityQuery]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCity) {
      setFormErrors({
        destination: ['Please select a valid city from the suggestions.'],
      });
      return;
    }

    setIsProcessing(true);
    setFormErrors({});

    const formData = new FormData(e.currentTarget);
    formData.set('destination', selectedCity);
    const uuid = crypto.randomUUID();

    const data = {
      id: uuid,
      destination: selectedCity,
      days: formData.get('days'),
      style: formData.get('style'),
      interests: formData.get('interests'),
      requirements: formData.get('requirements'),
      feedback: null,
    };

    await kv.set(`travel:${uuid}`, JSON.stringify(data));

    const feedback = await ai.chat(
      prepareInstructions({
        destination: String(data.destination),
        days: String(data.days),
        style: String(data.style),
        interests: String(data.interests),
        special_requirements: String(data.requirements),
      })
    );

    if (!feedback) {
      alert('Something went wrong with AI feedback.');
      setIsProcessing(false);
      return;
    }

    const feedbackText =
      typeof feedback.message.content === 'string'
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`travel:${uuid}`, JSON.stringify(data));

    router.push(`/trip/${uuid}`);
  };

  if (isProcessing) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-[500px] flex-col gap-4 rounded-lg border-2 border-blue-300 bg-white px-4 py-8 shadow-2xl"
    >
      {/* Destination */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] text-black/30">Destination</label>
        <input
          type="text"
          value={cityQuery}
          onChange={(e) => {
            setCityQuery(e.target.value);
            setSelectedCity('');
          }}
          placeholder="Type a city name"
          className="rounded-lg border p-2 text-xs text-black/80"
          autoComplete="off"
        />
        {formErrors.destination && (
          <p className="text-xs text-red-500">{formErrors.destination[0]}</p>
        )}
        {citySuggestions.length > 0 && (
          <ul className="mt-1 max-h-40 overflow-y-auto rounded border bg-white shadow">
            {citySuggestions.map((city) => (
              <li
                key={city.id}
                onClick={() => {
                  setSelectedCity(city.name);
                  setCityQuery(city.name);
                  setCitySuggestions([]);
                }}
                className="cursor-pointer p-2 hover:bg-blue-100"
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
        <input type="hidden" name="destination" value={selectedCity} />
      </div>

      {/* Days */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] text-black/30">Number of days</label>
        <input
          name="days"
          className="rounded-lg border p-2 text-xs text-black/80"
        />
      </div>

      {/* Travel style */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] text-black/30" htmlFor="style">
          Travel style
        </label>
        <select
          name="style"
          id="style"
          className="cursor-pointer rounded-lg border p-2 text-xs text-black/80"
        >
          {travelStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      {/* Interests */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] text-black/30">Interests</label>
        <input
          name="interests"
          className="rounded-lg border p-2 text-xs text-black/80"
        />
      </div>

      {/* Requirements */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] text-black/30">
          Special requirements
        </label>
        <input
          name="requirements"
          className="rounded-lg border p-2 text-xs text-black/80"
        />
      </div>

      <button
        type="submit"
        className="mt-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
}
