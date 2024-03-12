"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

const genreItems = [
  {
    id: 'Action',
    label: 'Action',
  },
  {
    id: 'Indie',
    label: 'Indie',
  },
  {
    id: 'Adventure',
    label: 'Adventure',
  },
  {
    id: 'RPG',
    label: 'RPG',
  },
  {
    id: 'Strategy',
    label: 'Strategy',
  },
  {
    id: 'Shooter',
    label: 'Shooter',
  },
  {
    id: 'Casual',
    label: 'Casual',
  },
  {
    id: 'Simulation',
    label: 'Simulation',
  },
  {
    id: 'Puzzle',
    label: 'Puzzle',
  },
  {
    id: 'Arcade',
    label: 'Arcade',
  },
  {
    id: 'Platformer',
    label: 'Platformer',
  },
  {
    id: 'Racing',
    label: 'Racing',
  },
  {
    id: 'Massively Multiplayer',
    label: 'Massively Multiplayer',
  },
  {
    id: 'Sports',
    label: 'Sports',
  },
  {
    id: 'Fighting',
    label: 'Fighting',
  },
  {
    id: 'Family',
    label: 'Family',
  },
  {
    id: 'Board Games',
    label: 'Board Games',
  },
  {
    id: 'Educational',
    label: 'Educational',
  },
  {
    id: 'Card',
    label: 'Card',
  },
] as const;

const tagItems = [
  {
    id: 'Singleplayer',
    label: 'Singleplayer',
  },
  {
    id: 'Steam Achievements',
    label: 'Steam Achievements',
  },
  {
    id: 'Multiplayer',
    label: 'Multiplayer',
  },
  {
    id: 'Full controller support',
    label: 'Full controller support',
  },
  {
    id: 'Steam Cloud',
    label: 'Steam Cloud',
  },
  {
    id: 'Atmospheric',
    label: 'Atmospheric',
  },
  {
    id: 'steam-trading-cards',
    label: 'Steam Trading Cards',
  },
  {
    id: 'Great Soundtrack',
    label: 'Great Soundtrack',
  },
  {
    id: 'RPG',
    label: 'RPG',
  },
  {
    id: 'Co-op',
    label: 'Co-op',
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

interface SideBarGenreProps {
  onSubmit: (items: string[]) => void;
  selectionType: string;
}
const SideBarGenre = (props: SideBarGenreProps) => {

  const items = props.selectionType === 'genre' ? genreItems : tagItems;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {

    props.onSubmit(data.items);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                {/* <FormLabel className="text-base">Genres</FormLabel> */}
                <FormDescription>
                {props.selectionType === 'genre' ? 'Select the genres you want to play' : 'Select the tags you are interested in'}
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) =>
                            checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter((value) => value !== item.id)
                                )
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Filter</Button>
      </form>
    </Form>
  );
};

export default SideBarGenre;