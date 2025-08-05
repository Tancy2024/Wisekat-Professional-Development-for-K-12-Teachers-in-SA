import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Magnetic } from "../../../components/motion-primitives/magnetic";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Team1Props {
  heading?: string;
  subheading?: string;
  description?: string;
  members?: TeamMember[];
}

const TeamSection = ({
  heading = "Meet our team",
  members = [
    {
      id: "person-3",
      name: "Hui Tao",
      role: "Team Lead",
      avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
    },
    {
      id: "person-4",
      name: "Jingyu Qi",
      role: "Frontend Developer",
      avatar: "https://shadcnblocks.com/images/block/avatar-7.webp",
    },
    {
      id: "person-5",
      name: "Zilin Song",
      role: "Frontend Developer",
      avatar: "https://shadcnblocks.com/images/block/avatar-5.webp",
    },
    {
      id: "person-7",
      name: "Jinyu Miao",
      role: "Backend Developer",
      avatar: "https://shadcnblocks.com/images/block/avatar-4.webp",
    },
  ],
}: Team1Props) => {
  return (
    <section className='py-10'>
      <div className='container flex flex-col items-center text-center'>
        <h2 className='my-6 text-3xl font-bold text-pretty lg:text-4xl'>
          {heading}
        </h2>
      </div>
      <div className='container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4'>
        {members.map((person) => (
          <div key={person.id} className='flex flex-col items-center'>
            <Avatar className='mb-4 size-20 border md:mb-5 lg:size-24 hover:'>
              <Magnetic>
                <AvatarImage src={person.avatar} />
              </Magnetic>

              <AvatarFallback>{person.name}</AvatarFallback>
            </Avatar>
            <p className='text-center font-medium'>{person.name}</p>
            <p className='text-center text-muted-foreground'>{person.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { TeamSection };
