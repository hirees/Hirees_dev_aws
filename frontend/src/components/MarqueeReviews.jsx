
import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure className={cn(
      "relative w-72 sm:w-80 cursor-pointer overflow-hidden rounded-xl border p-4 sm:p-6 mx-2 sm:mx-4",
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
    )}>
      <div className="flex flex-row items-center gap-2 sm:gap-3">
        <img className="rounded-full w-8 h-8 sm:w-10 sm:h-10" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm sm:text-base font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs sm:text-sm font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
        {body}
      </blockquote>
    </figure>
  );
};

const MarqueeReviews = () => {
  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="text-center mb-6 sm:mb-8 px-4">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2 sm:mb-4">
          What Our Community Says
        </h2>
        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300">
          Join thousands of satisfied professionals advancing their careers
        </p>
      </div>

      <div className="relative flex h-[400px] sm:h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 sm:w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 sm:w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </section>
  );
};

export default MarqueeReviews;