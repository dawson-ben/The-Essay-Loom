/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  HouseHeart, 
  Zap, 
  HelpCircle, 
  DoorOpen, 
  Globe, 
  Flame, 
  Gem, 
  Plus, 
  X, 
  BookOpen, 
  Sparkles,
  Info,
  Check
} from 'lucide-react';

export interface Beat {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StoryBeatDetail {
  text: string;
  isSubverted?: boolean;
  subversionNote?: string;
}

export interface Story {
  id: string;
  title: string;
  creator: string;
  type: 'film' | 'literature' | 'academic';
  summary: string;
  beats: Record<string, StoryBeatDetail>;
}

// 8 core narrative beats matching the Hero's Journey concept
export const HERO_BEATS: Beat[] = [
  {
    id: 'ordinary_world',
    name: '1. Ordinary World',
    description: 'The familiar environment; comfort zone with silent restrictions. This is the, \'Once upon a time there was a.... Every day...\' of so many stories',
    icon: HouseHeart,
  },
  {
    id: 'inciting_incident',
    name: '2. Inciting Incident',
    description: 'The disruption or unexpected call that breaks the status quo.',
    icon: Zap,
  },
  {
    id: 'dont_hesitation',
    name: '3. Doubts & Hesitation',
    description: 'Imposter syndrome, fear of failure, or resistance to change.',
    icon: HelpCircle,
  },
  {
    id: 'commitment_crossing',
    name: '4. The Commitment',
    description: 'Physically or metaphorically stepping out of the "ordinary" world in a way that is difficult or impossible to reverse.',
    icon: DoorOpen,
  },
  {
    id: 'special_world',
    name: '5. The Special World',
    description: 'The testing ground; learning skills and experiencing events that prepare the hero for the ordeal.',
    icon: Globe,
  },
  {
    id: 'ordeal_climax',
    name: '6. The Ordeal',
    description: 'The ultimate climax, vulnerability, or sacrifice where the plans crumble or the stakes peak.',
    icon: Flame,
  },
  {
    id: 'winning_action',
    name: '7. Winning Action',
    description: 'The hero\'s agency; resolving the conflict using newly gained insight or character growth.',
    icon: Gem,
  },
  {
    id: 'transformation_elixir',
    name: '8. The Elixir / Return',
    description: 'The hero\'s new skill, realization, or truth about themselves or the world, carried back to benefit others.',
    icon: Sparkles,
  }
];

export const STORY_CHARACTERS: Record<string, string> = {
  student_essay: "Camp Counselor",
  student_pole_vault: "DIY Pole Vaulter",
  student_tire_mechanic: "Garage Mechanic",
  harry_potter: "Harry Potter",
  neville_longbottom: "Neville Longbottom",
  lord_of_the_rings_frodo: "Frodo Baggins",
  lord_of_the_rings_sam: "Samwise Gamgee",
  lord_of_the_rings_aragorn: "Aragorn",
  the_hobbit: "Bilbo Baggins",
  onward: "Ian Lightfoot",
  spiderman: "Peter Parker",
  legally_blonde: "Elle Woods",
  big_hero_6: "Hiro Hamada",
  luke_skywalker: "Luke Skywalker",
  rey_skywalker: "Rey Skywalker",
  up_carl: "Carl Fredricksen",
  napoleon_dynamite: "Napoleon Dynamite",
  aladdin: "Aladdin",
  rudy: "Rudy Ruettiger"
};

export const FAMILIAR_STORIES: Story[] = [
  {
    id: 'student_essay',
    title: 'Camp Counselor Essay',
    creator: 'Example',
    type: 'academic',
    summary: 'A camp counselor unexpectedly takes over the science program, shifting from rigid planning to fostering organic, hands-on discovery.',
    beats: {
      ordinary_world: {
        text: '• Expecting a normal day teaching water sports to forty elementary-aged kids.\n• Debating whether to apply sunscreen under the overcast California sky.'
      },
      inciting_incident: {
        text: '• Finds a Post-it note on the STEM classroom door from the manager: "STEM teacher quit. Just keep them alive!"'
      },
      dont_hesitation: {
        text: '• How to stretch minute-long attention spans for an entire hour?\n• Ambitions for a productive class feel naive when a young camper proudly declares himself exempt from the laws of physics and camp rules.'
      },
      commitment_crossing: {
        text: '• Refused to settle for just keeping the kids alive.\n• Resolved to give them the kind of vibrant, hands-on discovery that defined my own childhood.'
      },
      special_world: {
        text: '• Scavenges the camp kitchen for honey, dish soap, vegetable oil, and a potato.\n• Turns the chaotic lake into an improvised laboratory, using acorns and whiteboards to demonstrate buoyancy.'
      },
      ordeal_climax: {
        text: '• Attempting to build a structured lesson plan while actively wrangling a wobbly fleet of kayaks and dealing with highly distracted, defiant campers.'
      },
      winning_action: {
        text: '• Remembered "Saturday engineering challenges" with dad, realizing that genuine curiosity is sparked by puzzles and trial-and-error.\n• Implemented a sticker-based point system to gamify questions and tailored daily lessons to observations of the local marsh ecosystem.\n• Arrived early each morning to brainstorm custom whiteboard diagrams based on the previous day\'s questions.'
      },
      transformation_elixir: {
        text: '• The campers begin asking unprompted questions and successfully explain the science of invisible UV radiation.\n• The need to hire a replacement science teacher completely disappears.\n• Curiosity is a positive feedback loop: carried forward a new mindset, approaching all complex systems as puzzles to be systematically deconstructed and rebuilt.'
      }
    }
  },
  {
    id: 'student_pole_vault',
    title: 'Backyard Vaulting Setup',
    creator: 'Example',
    type: 'academic',
    summary: 'A track athlete overcomes severe performance anxiety and injury setbacks by building a training setup in the dark backyard with I-beams.',
    beats: {
      ordinary_world: {
        text: '• Cleared 9 feet as a freshman varsity pole vaulter.\n• Believed path to the school record would be a straight, easy line of continuous triumph.'
      },
      inciting_incident: {
        text: '• Fails to clear even the low opening height of 7 feet in the first sophomore meets.\n• Bottoms out completely ("no-heights") in front of a massive crowd at the region\'s biggest track meet.'
      },
      dont_hesitation: {
        text: '• Crippled by acute psychological anxiety, viewing herself as an absolute embarrassment to her team.\n• Terrified of stepping onto the runway, dreading each failure ahead.'
      },
      commitment_crossing: {
        text: '• Recharts her definition of success and commits to radical daily practice.\n• Drags salvaged 20-foot steel I-beams from a construction salvage yard to build a backyard training rig.'
      },
      special_world: {
        text: '• Digging holes, pouring heavy bags of concrete with her father in the dark of night.\n• Drilling ropes, rings, and crossbar routines day after day in her own yard.\n• Redirecting her focus to celebrating teammate milestones instead of measuring herself by absolute scores.'
      },
      ordeal_climax: {
        text: '• Facing a career-defining leap at the junior state tournament with heavy pressure.\n• High expectations, cold weather, and a row of critical spectators staring down.'
      },
      winning_action: {
        text: '• Ignores the competitive noise of the crowd, replicates her backyard drills, and swings with absolute personal discipline.'
      },
      transformation_elixir: {
        text: '• Clears 10 feet to earn a personal record and a podium spot.\n• Realizes that real confidence is forged in the quiet darkness of the backyard, and mentors younger struggling athletes.'
      }
    }
  },
  {
    id: 'student_tire_mechanic',
    title: 'The Torque Wrench Key',
    creator: 'Example',
    type: 'academic',
    summary: 'A student transitions from an administrative observer to active hands-on volunteer, preparing a van for a struggling family of eight.',
    beats: {
      ordinary_world: {
        text: '• Growing up in a small town, comfortable and unaware of the systemic poverty around the neighborhood.'
      },
      inciting_incident: {
        text: '• Shocked by the statistic that 701 local students are currently homeless.\n• Learning of a mother\'s tragic death because her family lacked a car to go purchase a simple $30 asthma inhaler.'
      },
      dont_hesitation: {
        text: '• Felt paralyzed by the sheer size of systemic poverty, believing a teenager can do nothing to alter it.\n• Reluctant to step out of high school social bubbles.'
      },
      commitment_crossing: {
        text: '• Deeply commits to direct service, joining an auto-assistance program to restore vehicles for families in need.\n• Agrees to physically work in the grease-filled garage instead of sitting on committees.'
      },
      special_world: {
        text: '• Learning to balance heavy wheels, mount rubber, and operate tire machines from scratch.\n• Battling exhaust fumes, bruised knuckles, and heavy materials in a chilly winter garage.\n• Collaborating directly with school counselors to identify a single mother with eight children.'
      },
      ordeal_climax: {
        text: '• Trying to complete a customized van on a tight holiday deadline.\n• A tire bead tears under pressure, the tire machine jams, and the delivery deadline is seconds away with hands covered in black grease.'
      },
      winning_action: {
        text: '• Regroups, applies manual lever workarounds, balances the wheel perfectly, and hand-tightens the lugs using a precise torque wrench.'
      },
      transformation_elixir: {
        text: '• Hands the keys directly to the family, empowering them with a lifetime of mobility and safety.\n• Realizes that micro-service in the right spots breaks large patterns, returning to build beds for children sleeping on bare floors.'
      }
    }
  },
  {
    id: 'harry_potter',
    title: 'Harry Potter and the Sorcerer’s Stone)',
    creator: 'J.K. Rowling',
    type: 'literature',
    summary: 'An orphan boy discovers he\'s a wizard, enters Hogwarts, and faces dangerous trials to protect his new-found home.',
    beats: {
      ordinary_world: {
        text: '• The cupboard under the stairs at Number 4 Privet Drive.\n• Treated as a nuisance and Dudley’s punching bag by his aunt and uncle.'
      },
      inciting_incident: {
        text: '• A deluge of letters arrives, followed by Hagrid breaking down the door of the Hut-on-the-Rock.\n• Hagrid delivers the shocking news: Yer a wizard, Harry.'
      },
      dont_hesitation: {
        text: '• Assumes there must be a giant mistake.\n• Stammers, I can’t be a wizard. I’m just Harry!'
      },
      commitment_crossing: {
        text: '• Crosses progressive thresholds: leaving the island hut with Hagrid, shopping in Diagon Alley, and runs directly at the solid brick wall of Platform 9 3/4.'
      },
      special_world: {
        text: '• Early failures like melting cauldrons and academic isolation.\n• Gaining key skills: learning to fly a broomstick and track small objects.\n• Resisting the temptation of the Mirror of Erised after warning from Dumbledore.\n• Uniting with Ron and Hermione to defeat a rogue mountain troll, cementing a lifelong team.'
      },
      ordeal_climax: {
        text: '• Dropping down the trapdoor through Devil\'s Snare, Wizard\'s Chess, and flying keys.\n• Facing Quirrell and the remnant of Voldemort alone in the Mirror chamber, prepared to let himself be killed to prevent the Sorcerer’s Stone from being stolen.'
      },
      winning_action: {
        text: '• Chooses to keep the stone safe within his pocket rather than seeking its power.'
      },
      transformation_elixir: {
        text: '• Realizes that real courage, love, and true friendship are more powerful than any dark magical skill.\n• Returns to the Dursleys with a secure sense of self-worth and belonging, knowing Hogwarts is now his true home.'
      }
    }
  },
  {
    id: 'neville_longbottom',
    title: 'Harry Potter series',
    creator: 'J.K. Rowling',
    type: 'literature',
    summary: 'A clumsy, insecure late-bloomer at wizarding school struggles under expectation, eventually becoming the unyielding leader of the student resistance.',
    beats: {
      ordinary_world: {
        text: '• Raised by a stern, disappointed grandmother who fears he is a squib.\n• Famous for dropping his toad Trevor and being the general joke of the dorms.'
      },
      inciting_incident: {
        text: '• Thrust into Gryffindor—the house of the brave—where his fears of failing to measure up to his parents\' heroic legacy are magnified.'
      },
      dont_hesitation: {
        text: '• Feels intense shame over his Herbology-only talents and buckles under Snape\'s cruel potions-class bullying.\n• Believes he is a mistake who belongs in Hufflepuff instead.'
      },
      commitment_crossing: {
        text: '• Tries to block Harry, Ron, and Hermione from sneaking out of the common room, stating it\'s his duty to protect Gryffindor\'s house points.\n• Metaphorically steps into moral courage where standing up to friends is harder than standing up to enemies.'
      },
      special_world: {
        text: '• Developing mastery in Herbology, discovering a niche where he genuinely excels.\n• Joining Dumbledore\'s Army where Harry\'s patient tutoring unlocks his defensive skills.\n• Suffering severe failures at the Department of Mysteries but refusing to yield to Death Eaters under pressure.'
      },
      ordeal_climax: {
        text: '• Standing alone as Voldemort\'s army marches into Hogwarts holding Harry\'s apparently lifeless body.\n• Refusing to bow or accept surrender when all hope seems entirely dead.'
      },
      winning_action: {
        text: '• Breaking free from Voldemort\'s body-bind curse.\n• Pulling Gryffindor\'s sword from the burning Sorting Hat and slicing off Nagini\'s head to destroy the final Horcrux.'
      },
      transformation_elixir: {
        text: '• Unlocks the realization that courage isn\'t the absence of fear, but the willingness to stand firm when all hope seems lost.\n• Uses his leadership and moral authority to restore pride to Gryffindor and becomes Hogwarts\' beloved Herbology Professor.'
      }
    }
  },
  {
    id: 'lord_of_the_rings_frodo',
    title: 'Lord of the Rings series',
    creator: 'J.R.R. Tolkien',
    type: 'literature',
    summary: 'A humble hobbit inherits the master Ring of Power and takes on the burden of destroying it in Mt. Doom.',
    beats: {
      ordinary_world: {
        text: '• Peaceful life in the quiet Shire, reading books.\n• Safe afternoon teas and ignores the dark conflicts of far lands.'
      },
      inciting_incident: {
        text: '• Gandalf throws Bilbo’s old ring into the fireplace.\n• Glowing script identifies it as Sauron’s One Ring.'
      },
      dont_hesitation: {
        text: '• Tries to get Gandalf to take the Ring instead, feeling too weak and small.'
      },
      commitment_crossing: {
        text: '• Steps forward during the divided Council of Elrond.\n• Declares: I will take the Ring, though I do not know the way.'
      },
      special_world: {
        text: '• Fleeing Ringwraiths, falling to temptation to use the ring at Weathertop (gets stabbed).\n• Learning to trust Samwise implicitly after the Fellowship splinters.\n• Surviving dead marshes, Gollum\'s double-dealing, and climbing the stairs of Cirith Ungol where the Ring tests his limits.'
      },
      ordeal_climax: {
        text: '• Standing at the edge of the Mt. Doom caldera.\n• Exhaustion and the Ring’s defeat his willpower.'
      },
      winning_action: {
        text: '• Subverted. Frodo breaks and claims the Ring as his own.\n• Crucial intervention of Gollum biting the Ring off allows its destruction.'
      },
      transformation_elixir: {
        text: '• Realizes that absolute mercy (having spared Gollum) can save kingdoms when pure willpower collapses.\n• Uses this deep wisdom to organize home history records for the Shire.'
      }
    }
  },
  {
    id: 'lord_of_the_rings_sam',
    title: 'Lord of the Rings series',
    creator: 'J.R.R. Tolkien',
    type: 'literature',
    summary: 'A simple Shire gardener is pulled into an epic quest and proves that ordinary loyalty can outlast ancient, dark empires.',
    beats: {
      ordinary_world: {
        text: '• Works as the humble gardener tending the rose gardens of Bag End.\n• Enjoys simple gossip and local agricultural work.'
      },
      inciting_incident: {
        text: '• Caught eavesdropping under the window by Gandalf.\n• Gandalf pulls him inside and orders him to watch over Frodo.'
      },
      dont_hesitation: {
        text: '• Scared of scary legends, elves, and dark magic.\n• Driven entirely by his unshakeable promise never to leave Frodo’s side.'
      },
      commitment_crossing: {
        text: '• Pauses at the very border of a cornfield: If I take one more step, it’ll be the farthest from home I’ve ever been.\n• Takes the step past the boundary.'
      },
      special_world: {
        text: '• Preparing trail stews, seeing real Elves in the woods.\n• Failing to stop Gollum\'s early manipulation, which nearly breaks his relationship with Frodo.\n• Developing keen wilderness navigation, fighting Orc scouts, and maintaining simple Shire-based hope when food, water, and sight run bone-dry.'
      },
      ordeal_climax: {
        text: '• Confronting the giant spider Shelob alone after Frodo gets paralyzed.\n• Believing Frodo is dead and realizing he must carry the heavy Ring alone.'
      },
      winning_action: {
        text: '• Refuses to yield to physical collapse.\n• Hoists Frodo onto his back up the slopes of Mount Doom and fights off Gollum’s ambush.'
      },
      transformation_elixir: {
        text: '• Discovers that ordinary, simple devotion can endure any tyrant.\n• Uses his newly recognized leadership skills to rebuild the Shire gardens and serve as its long-term Mayor.'
      }
    }
  },
  {
    id: 'lord_of_the_rings_aragorn',
    title: 'Lord of the Rings series',
    creator: 'Peter Jackson, J.R.R. Tolkien',
    type: 'literature',
    summary: 'A ranger avoids his ancestral claim to the throne, but eventually embraces his heritage to unite the free kingdoms of Men.',
    beats: {
      ordinary_world: {
        text: '• A nearly anonymous ranger in the wilds of Middle Earth.\n• Actively rejects his right to rule due to a deep fear of being corrupted like Isildur.'
      },
      inciting_incident: {
        text: '• Meets the hobbits at the Prancing Pony in Bree.\n• Must step out of the shadows to protect them from the pursuing Ringwraiths.'
      },
      dont_hesitation: {
        text: '• Rsisists Elrond’s urging to claim the throne of Gondor.\n• Continues to position himself as a supporting guardian, fearing that accepting leadership will inevitably lead to a moral failure.'
      },
      commitment_crossing: {
        text: '• Takes active command of the Fellowship after Gandalf falls in the mines of Moria.\n• Pledges his life to guide the Ringbearer, abandoning his ranger patrols to enter the broader global war.'
      },
      special_world: {
        text: '• Relentlessly tracks captured hobbits across Rohan and defends Helm\'s Deep against overwhelming odds.\n• Learns to command the fractured, proud races of Men and Elves, shifting from solitary ranger to battlefield general.'
      },
      ordeal_climax: {
        text: '• Accepts the reforged sword Andúril from Elrond, formally embracing his royal title and the burden it carries.\n• Enters the terrifying Paths of the Dead to recruit an army of cursed oathbreakers.'
      },
      winning_action: {
        text: '• Leads a desperate, suicidal distraction at the Black Gate solely to buy Frodo time to destroy the Ring.\n• Rallies his terrified soldiers and charges first, acting fully as the recognized King of Gondor.'
      },
      transformation_elixir: {
        text: '• Accepts the high crown of the Reunited Kingdom and marries Arwen, ending his physical and emotional isolation.\n• Conquers his fear of inherited weakness, providing the steady leadership required to usher in the Fourth Age.'
      }
    }
  },
  {
    id: 'the_hobbit',
    title: 'The Hobbit',
    creator: 'J.R.R. Tolkien',
    type: 'literature',
    summary: 'A respectable, adventure-averse hobbit leaves his cozy home to help a pack of dwarves reclaim their mountain fortress from a dragon.',
    beats: {
      ordinary_world: {
        text: '• Enjoys smoking pipeweed on his front porch.\n• Loves pre-planned warm meals, safety, and predictability.'
      },
      inciting_incident: {
        text: '• Gandalf marks his door with a thief emblem.\n• Brings thirteen loud dwarves who present a high-risk quest to steal gold from a dragon.'
      },
      dont_hesitation: {
        text: '• Trembles and flatly refuses to go.\n• Screams at mentions of dragon fire and faints on his living room rug.'
      },
      commitment_crossing: {
        text: '• Wakes up late, realizes his safe life is boring.\n• Runs out of his door without a coat, hat, or handkerchief to chase the dwarves.'
      },
      special_world: {
        text: '• Getting captured by stone trolls, getting separated inside massive Goblin tunnels.\n• Playing a high-stakes riddle game with Gollum and discovering the magic Ring.\n• Developing stealth, rescue skills (saving dwarves from wood-elves and spiders), and finding his voice as a leader among stubborn dwarves.'
      },
      ordeal_climax: {
        text: '• Creeping down the dark rock chute into the mountain belly alone.\n• Looking Smaug the dragon directly in the eyes.'
      },
      winning_action: {
        text: '• Steals the legendary Arkenstone and sneaks out of camp.\n• Uses it to negotiate a peaceful agreement, preventing an all-out five-army war.'
      },
      transformation_elixir: {
        text: '• Returns to the Shire with chest of gold and an invisible ring.\n• Realizes his sharp wit and versatility can bridge deep divides, which he uses to welcome travelers and write books.'
      }
    }
  },
  {
    id: 'onward',
    title: 'Onward',
    creator: 'Pixar / Dan Scanlon',
    type: 'film',
    summary: 'Two teenage elf brothers combine modern driving with ancient wizardry on a quest to spend one last day with their late father.',
    beats: {
      ordinary_world: {
        text: '• Lives in a modern suburban city with zero magic.\n• Struggles with social anxiety and misses his late dad.'
      },
      inciting_incident: {
        text: '• Receives an old wizard staff on his 16th birthday.\n• Spell goes wrong, regenerating only his dad’s bottom half.'
      },
      dont_hesitation: {
        text: '• Thinks he’s too weak and clumsy to cast real spells.\n• Believes he doesn’t have the magical inner spark.'
      },
      commitment_crossing: {
        text: '• Grabs the keys to Barley’s sketchy van.\n• Steps on the gas to launch a time-sensitive road pursuit for a phoenix gem.'
      },
      special_world: {
        text: '• Running away from angry pixie biker clubs.\n• Casting a spell to create a bottomless canyon bridge and falling through on early nervous attempts before trusting his brother\'s advice.\n• Learning to shift gears and drive a stick-shift van under extreme freeway pursuit pressure.'
      },
      ordeal_climax: {
        text: '• Realizing they toured back to their own town center.\n• Facing a giant rock ruins-dragon attempting to crush them.'
      },
      winning_action: {
        text: '• Subverted. He steps aside so his brother Barley can talk to their dad.\n• Fights the dragon single-handedly while the sun sets.'
      },
      transformation_elixir: {
        text: '• Unlocks genuine magical mastery and a realization of his brother’s huge sacrifices.\n• Uses his skills of trust and confidence to revive community enchantment.'
      }
    }
  },
  {
    id: 'spiderman',
    title: 'Spider-Man',
    creator: 'Marvel Comics / Stan Lee',
    type: 'film',
    summary: 'A brilliant but awkward high school student gains arachnid abilities and must learn the cost of ignoring his calling.',
    beats: {
      ordinary_world: {
        text: '• An awkward high school outsider who\'s good at photography and science.\n• Bullied by classmates and lives under Aunt May and Uncle Ben’s rules.'
      },
      inciting_incident: {
        text: '• Bitten by a glowing genetically-modified spider on school field trip.\n• Wakes up with extreme physical reflexes and ceiling climbing.'
      },
      dont_hesitation: {
        text: '• Avoids any responsibility for his powers.\n• Uses them to win easy wrestling cash and ignores a running thief.'
      },
      commitment_crossing: {
        text: '• Finding Uncle Ben shot dead on the sidewalk by the very same thief.\n• Realizes his choice to stand aside had an irreversible personal cost.'
      },
      special_world: {
        text: '• Testing web lines on rooftops, taking painful back-alley tumbles.\n• Failing to balance high school homework with early random crime fighting.\n• Mastering spider-sense reflexes, building a durable suit, and taking photos of himself to pay his aunt’s rent.'
      },
      ordeal_climax: {
        text: '• Goblin holding Mary Jane and a tram full of kids over the river.\n• Forced to choose between saving his love or saving the children.'
      },
      winning_action: {
        text: '• Declines the villain’s cruel choice.\n• Grabs both lines with bleeding hands and pulls them to safety.'
      },
      transformation_elixir: {
        text: '• Commits to a life of service: With great power comes great responsibility.\n• Uses his burden of responsibility to protect NYC while keeping his identity secret.'
      }
    }
  },
  {
    id: 'legally_blonde',
    title: 'Legally Blonde',
    creator: 'Robert Luketic',
    type: 'film',
    summary: 'A sunny, fashion-obsessed sorority president conquers Harvard Law School to recover her self-respect and conquer stereotypes.',
    beats: {
      ordinary_world: {
        text: '• Lives a pink-themed life as bubbly sorority president.\n• Majors in fashion and expects a typical, wealthy Malibu marriage.'
      },
      inciting_incident: {
        text: '• Warner dumps her over dinner.\n• Says she’s too blonde and not serious enough for law school.'
      },
      dont_hesitation: {
        text: '• Spends days eating chocolate on the couch.\n• Convinced she has to fit into his narrow standard of \'serious\'.'
      },
      commitment_crossing: {
        text: '• Studies for the LSAT, scores a 179, and gets into Harvard.\n• Steps onto the stuffy, dark-wood campus wearing a bright-pink leather suit.'
      },
      special_world: {
        text: '• Humiliated in her first Harvard seminar class and thrown out by the professor.\n• Refuses to go to typical parties; spends weeks studying intensely.\n• Improves her analytical skills and earns one of four coveted defense-intern seats.'
      },
      ordeal_climax: {
        text: '• Professor Callahan makes inappropriate advances in his office.\n• Shatters her belief that she was hired for her mind.'
      },
      winning_action: {
        text: '• Refuses to quit, wears a bright-pink dress to court.\n• Wins the murder trial using her specific knowledge of perm hair care.'
      },
      transformation_elixir: {
        text: '• Graduates near the top of Harvard Law class.\n• Realizes she doesn’t need to dilute her personality to be brilliant, and uses her status to champion others who don’t fit the mold.'
      }
    }
  },
  {
    id: 'big_hero_6',
    title: 'Big Hero 6',
    creator: 'Don Hall & Chris Williams',
    type: 'film',
    summary: 'A fourteen-year-old robotics genius turns his brother’s medical robot into an armored defender, learning that real heroism stems from healing and selflessness over vengeance.',
    beats: {
      ordinary_world: {
        text: '• A brilliant but aimless 14-year-old coding prodigy, Hiro Hamada.\n• Wasting his cognitive gifts in dark, high-risk illegal underground robot street fighting in San Fransokyo.'
      },
      inciting_incident: {
        text: '• His compassionate older brother Tadashi is killed in a sudden, suspicious showcase fire.\n• Hiro inherits Baymax, an inflatable personal healthcare companion robot left as Tadashi\'s final creation.'
      },
      dont_hesitation: {
        text: '• Sinks into hollow depression, locking himself away inside his bedroom.\n• Refuses to attend university, ignores his bright campus peers, and leaves his future entirely in the dark.'
      },
      commitment_crossing: {
        text: '• Accidentally activates Baymax, who spots a rogue microbot reacting to a hidden signal.\n• Hiro armor-plates the gentle inflatable robot and steps out of his safe room to hunt the masked man who stole his invention.'
      },
      special_world: {
        text: '• Equipping and training his eccentric tech-savvy college friends with specialized power armor.\n• Coping with painful early flight-tuning failures where he crashes into the bay.\n• Gaining critical scanning skills, upgrading Baymax\'s thruster databases, and learning to work seamlessly as a tactical team.'
      },
      ordeal_climax: {
        text: '• First Ordeal (Vengeance): Ripping out Baymax\'s medical chip to force him to kill Yokai, which nearly destroys Baymax and fractures his friends\' trust.\n• Second Ordeal (Selflessness): Plunging deep into the collapsing, unstable portal dimension to locate and rescue Callaghan\'s daughter, Abigail, amidst swirling, crushing microbot debris.'
      },
      winning_action: {
        text: '• Subverted. Faced with a ruined thruster and trapped in the portal, Hiro must abandon Baymax to save Abigail.\n• Chooses to let go of his beloved companion by tearfully declaring "I am satisfied with my care," allowing Baymax\'s rocket-fist to propel Hiro and Abigail\'s pod to safety.'
      },
      transformation_elixir: {
        text: '• Rebuilds Baymax using the original healthcare chip left behind in the saved rocket-fist.\n• Discovers that Tadashi\'s spirit of healing lives on in his work, and dedicates his genius to defending their city alongside his brilliant superhero team.'
      }
    }
  },
  {
    id: 'luke_skywalker',
    title: 'Star Wars: A New Hope',
    creator: 'George Lucas',
    type: 'film',
    summary: 'A farm boy on a desert planet dreams of adventure, joins a rebellion, and learns to trust the mystical Force to defeat a galactic threat.',
    beats: {
      ordinary_world: {
        text: '• Staring at the twin suns on the dusty desert world of Tatooine.\n• Trapped in a mundane routine repairing moisture vaporators and living under uncle Owen\'s strict rules.'
      },
      inciting_incident: {
        text: '• Sees Leia\'s desparate hologram message to Obi-Wan, projected by R2-D2.\n• R2-D2 escapes, leading him to Ben Kenobi, who reveals his father was a legendary Jedi.'
      },
      dont_hesitation: {
        text: '• Rejects Obi-Wan\'s request to learn the ways of the Force and travel to Alderaan.\n• Flatly objects: "I can\'t get involved. I\'ve got work to do."'
      },
      commitment_crossing: {
        text: '• Returning to find his home and beloved aunt and uncle murdered by Imperial stormtroopers.\n• Realizes his old limits are gone forever: "There\'s nothing for me here now. I want to learn the ways of the Force."'
      },
      special_world: {
        text: '• Rescuing Princess Leia, navigating space dogfights, and coping with the shocking loss of his mentor Obi-Wan.\n• Failing on early training: trying to deflect laser-blasts blindfolded while Han Solo laughs at his efforts.\n• Swallowing his farm-boy ego to integrate with experienced rebel pilots at the rebel base.'
      },
      ordeal_climax: {
        text: '• Piloting an X-wing down the narrow Death Star trench under heavy fire.\n• Darth Vader locks onto his ship, his wingmen are forced to peel away, and his mechanical targeting computer is notoriously unreliable.'
      },
      winning_action: {
        text: '• Listens to Obi-Wan\'s spectral advice: "Luke, trust your feelings."\n• Switches off the artificial targeting computer completely, closes his eyes, and relies purely on innate instinct and training.'
      },
      transformation_elixir: {
        text: '• Fires the perfect proton torpedo to destroy the Death Star and receives a medal of honor.\n• Discovers that inner faith and trust are vastly superior to mechanical technology, taking his first steps as a true Jedi.'
      }
    }
  },
  {
    id: 'rey_skywalker',
    title: 'Star Wars: The Force Awakens',
    creator: 'Lucasfilm / J.J. Abrams',
    type: 'film',
    summary: 'A lonely scavenger waiting for her family on Jakku is swept into galactic conflict, discovers a deep connection to the Force, and embraces her chosen destiny.',
    beats: {
      ordinary_world: {
        text: '• Scraping rust off Imperial wreckages on the desert wasteland of Jakku.\n• Counting the days on her wall, hoarding food portions, and desperately waiting for a family that will never return.'
      },
      inciting_incident: {
        text: '• Rescues BB-8 from another scavenger.\n• Joins forces with Finn and escapes the planet on a dusty old ship, the Millennium Falcon.'
      },
      dont_hesitation: {
        text: '• Experiencing terrifying, chaotic psychic visions upon touching Luke Skywalker\'s old lightsaber.\n• Flees into the dark woods in sheer panic, sobbing that she will never touch the lightsaber again.'
      },
      commitment_crossing: {
        text: '• Captured by Kylo Ren, she resists his mental mind probe using her own latent Force capacity.\n• Acts to escape Starkiller Base, fully committing to the fight instead of waiting to return to Jakku.'
      },
      special_world: {
        text: '• Stranded on the snowy Starkiller Base with a lightsaber she has never wielded.\n• Gaining crucial self-reliance, coping with Luke Skywalker\'s bitter refusal to train her on Ahch-To, and facing the terrifying dark-side mirror cave.\n• Attempting to connect with Kylo Ren through Force bonds despite extreme warnings.'
      },
      ordeal_climax: {
        text: '• Confronting her grandfather, Emperor Palpatine/Darth Sidious, on Exegol.\n• Depleted of physical strength, surrounded by dark shadows, and told she must accept her dark heritage or watch everyone die.'
      },
      winning_action: {
        text: '• Reaches out to the past, hearing the whispered support of all the Jedi who came before.\n• Crosses two lightsabers to deflect the Emperor\'s lightning, declaring "And I... am all the Jedi," destroying him.'
      },
      transformation_elixir: {
        text: '• Retires to Tatooine, buries Luke and Leia\'s lightsabers, and ignites her own yellow lightsaber.\n• Chooses her own name, "Rey Skywalker," rejecting her inheritance of dark power to define her own family and legacy.'
      }
    }
  },
  {
    id: 'up_carl',
    title: 'Up',
    creator: 'Pixar / Pete Docter',
    type: 'film',
    summary: 'A grumpy widower fights to keep his home and his late wife\'s memory, but realizes true adventure lies in new relationships.',
    beats: {
      ordinary_world: {
        text: '• Lives alone in his small, outdated house, surrounded by modern skyscrapers.\n• Clings stubbornly to his daily routine and his physical possessions to honor his late wife, Ellie.'
      },
      inciting_incident: {
        text: '• A construction worker damages his mailbox, and Carl strikes him with his cane.\n• This results in a court order forcing him into a retirement home and the forfeiture of his property.'
      },
      dont_hesitation: {
        text: '• Sits in his darkened living room holding Ellie\'s adventure book.\n• He feels defeated, believing he has permanently failed his lifelong promise to take her to Paradise Falls.'
      },
      commitment_crossing: {
        text: '• Instead of surrendering to the retirement home van, he releases thousands of helium balloons.\n• Turns his house into an airship to fly to South America.'
      },
      special_world: {
        text: '• Navigating a flying house through a massive thunderstorm. Discovering an accidental stowaway, Russell.\n• Landing in South America and physically dragging the heavy, hovering house across a rocky landscape.\n• Encountering unexpected allies like a giant bird named Kevin and a talking dog named Dug.'
      },
      ordeal_climax: {
        text: '• Charles Muntz captures Kevin and sets Carl\'s house on fire.\n• Forced to choose between saving Ellie\'s house and saving his new friends, Carl frantically extinguishes the fire, abandoning Kevin.\n• He successfully drags the house to the edge of Paradise Falls, but the victory feels entirely hollow.'
      },
      winning_action: {
        text: '• Carl physically throws his cherished, heavy antique furniture out the door to make the house light enough to fly again.\n• He actively chooses to rescue Russell and Kevin, leaving the physical memory of Ellie behind to save his new family.'
      },
      transformation_elixir: {
        text: '• Discovers that true adventure isn\'t a geographical destination, but the relationships built along the way.\n• Returns to the city to act as a surrogate grandfather for Russell, pins Ellie\'s grape soda badge onto his sash, and fully re-engages with the present world.'
      }
    }
  },
  {
    id: 'napoleon_dynamite',
    title: 'Napoleon Dynamite',
    creator: 'Jared Hess',
    type: 'film',
    summary: 'An awkward, highly unpopular high school outcast risks further humiliation to help his new friend run for class president.',
    beats: {
      ordinary_world: {
        text: '• An awkward, highly unpopular high school outcast in rural Idaho.\n• Spends his time drawing ligers, playing tetherball by himself, and fabricating stories about hunting wolverines.'
      },
      inciting_incident: {
        text: '• A quiet, new student named Pedro transfers to the school.\n• Napoleon is assigned to show him around, and Pedro soon decides to run for class president against the deeply entrenched, popular Summer Wheatley.'
      },
      dont_hesitation: {
        text: '• Napoleon possesses zero social capital and lacks the standard popularity metrics required to run a campaign.\n• He struggles to build a competitive strategy against Summer\'s polished, well-funded efforts.'
      },
      commitment_crossing: {
        text: '• Pledges his absolute loyalty to his new friend. He puts on the "Vote for Pedro" t-shirt and begins actively campaigning in the hallways.'
      },
      special_world: {
        text: '• Attempting to hand out homemade flyers, getting shoved into lockers, and learning sign language to sing with the Happy Hands Club.\n• He takes a risk by asking Trisha to the school dance and buys a dated thrift-store suit to build a more confident persona.'
      },
      ordeal_climax: {
        text: '• The final election assembly. Pedro delivers a quiet, depressing speech to an unresponsive crowd.\n• The principal announces that each candidate must present a skit. Pedro has prepared nothing, and his campaign faces a humiliating, public defeat.'
      },
      winning_action: {
        text: '• Napoleon hands his cassette tape to the sound engineer, walks onto the stage alone.\n• Performs a fiercely uninhibited, perfectly executed dance routine in front of the entire student body.'
      },
      transformation_elixir: {
        text: '• Discovers that his eccentricities are an asset rather than a liability.\n• He returns to the playground to play tetherball with Deb, completely secure in his unique identity, his quirks, and his friendships.'
      }
    }
  },
  {
    id: 'aladdin',
    title: 'Aladdin',
    creator: 'Ron Clements & John Musker',
    type: 'film',
    summary: 'A homeless thief finds a magical lamp and transforms into a prince to win a princess, but learns that his true worth comes from his character.',
    beats: {
      ordinary_world: {
        text: '• Homeless "street rat", stealing bread to survive, dodging royal guards, and dreaming of a life inside the palace where he is seen as more than a worthless thief.'
      },
      inciting_incident: {
        text: '• Rescues Jasmine in the marketplace. Forms a genuine connection with her, only discovering she’s the princess suddenly arrested.'
      },
      dont_hesitation: {
        text: '• Trapped in the palace dungeon, he feels entirely inadequate. He believes his poverty makes him fundamentally unworthy of the princess and that he has no future.'
      },
      commitment_crossing: {
        text: '• Enters the Cave of Wonders in search of the lamp.'
      },
      special_world: {
        text: '• Finds the lamp and Genie. Transforms into "Prince Ali."\n• Navigates the royal court, constantly lying to cover up his past, and battles massive impostor syndrome as he tries to maintain the illusion.'
      },
      ordeal_climax: {
        text: '• Jafar steals the lamp, exposes Aladdin as a fraud to the entire kingdom, strips away his princely facade, and banishes him to a frozen wasteland to die.'
      },
      winning_action: {
        text: '• Stripped of his magical advantage, Aladdin realizes his quick-witted street smarts are his actual strength. He recognizes that Jafar\'s thirst for power is a critical vulnerability.\n• Returns to Agrabah to face the vastly more powerful sorcerer.\n• Goads Jafar into wishing to become an all-powerful genie, trapping Jafar by the cosmic shackles of his new lamp.'
      },
      transformation_elixir: {
        text: '• Discovers that his true worth comes from his integrity, not his status or his wealth.\n• Uses his final wish to grant the Genie his freedom rather than making himself a prince, proving his noble character and earning the right to marry Jasmine exactly as he is.'
      }
    }
  },
  {
    id: 'rudy',
    title: 'Rudy',
    creator: 'David Anspaugh',
    type: 'film',
    summary: 'A small-town steel mill worker with poor grades overcomes immense physical and academic limitations to play football for Notre Dame.',
    beats: {
      ordinary_world: {
        text: '• Living in a working-class steel mill town. Small in stature and struggling with poor grades.\n• Expected to abandon his lifelong dream of playing football for Notre Dame and work in the local mill like his father and brothers.'
      },
      inciting_incident: {
        text: '• His best friend and only supporter, Pete, is tragically killed in an explosion at the steel mill.'
      },
      dont_hesitation: {
        text: '• Overwhelmed by grief and the chorus of voices (family, teachers, and his girlfriend) telling him he is too small and not smart enough.\n• Fears his dream really is a foolish delusion.'
      },
      commitment_crossing: {
        text: '• Refuses to settle for a life of regret.\n• He packs a bag, leaves his hometown, and boards a bus to South Bend, enrolling in a nearby junior college to fight his way into Notre Dame.'
      },
      special_world: {
        text: '• Battling severe dyslexia with a tutor to raise his grades. Taking a grueling job as a stadium groundskeeper to be near the field.\n• Enduring brutal, daily physical beatings as a tackling dummy on the Notre Dame practice squad while continuously failing to make the dress roster for actual games.'
      },
      ordeal_climax: {
        text: '• Approaching the final home game of his senior year. The new head coach refuses to put him on the dress list, breaking a previous coach\'s promise.\n• Utterly broken and feeling his years of sacrifice were for nothing, Rudy finally gives up and quits the team.'
      },
      winning_action: {
        text: '• Confronted by the head groundskeeper, Fortune, who shares his own lifelong regret of quitting the team, Rudy realizes true failure is giving up on his own commitment.\n• Swallows his pride and returns to the practice field, absorbing brutal hits to prepare the starting defense.\n• Inspired by his dedication, the senior players demand Rudy dress in their place. He is put into the final play and successfully sacks the opposing quarterback.'
      },
      transformation_elixir: {
        text: '• Carried off the field by his teammates, he realizes the journey wasn\'t about getting revenge on his detractors, but proving to himself that relentless perseverance can overcome any physical limitation.\n• Earns his degree from Notre Dame and his family\'s deep respect.'
      }
    }
  }
];

export default function HerosJourneyCompare() {
  const [selectedStoryIds, setSelectedStoryIds] = useState<string[]>([
    'student_essay',
    'harry_potter',
    'neville_longbottom',
    'lord_of_the_rings_frodo'
  ]);

  const toggleStory = (storyId: string) => {
    if (selectedStoryIds.includes(storyId)) {
      if (selectedStoryIds.length > 1) {
        setSelectedStoryIds(selectedStoryIds.filter(id => id !== storyId));
      }
    } else {
      setSelectedStoryIds([...selectedStoryIds, storyId]);
    }
  };

  return (
    <div id="heros_comparison_matrix" className="space-y-8">


      {/* Controller Area */}
      <div className="space-y-4" id="matrix_controls">
        <label className="text-xs font-sans font-bold text-slate-300 tracking-wide block">
          Select Stories to Stand Side-by-Side (Scroll horizontally to view all):
        </label>

        {/* Dynamic Selector Buttons */}
        <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto p-1.5 bg-slate-950/40 rounded-xl border border-slate-850" id="comparison_story_selector">
          {FAMILIAR_STORIES.map((story) => {
            const isSelected = selectedStoryIds.includes(story.id);

            return (
              <button
                key={story.id}
                id={`compare_toggle_${story.id}`}
                onClick={() => toggleStory(story.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-sans font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? story.type === 'academic'
                      ? 'bg-amber-950/40 border-amber-500 text-amber-100 shadow shadow-amber-500/10'
                      : 'bg-blue-950/40 border-blue-500 text-white shadow shadow-blue-500/10'
                    : story.type === 'academic'
                      ? 'bg-amber-950/10 border-amber-900/30 text-amber-500/80 hover:bg-amber-950/30 hover:border-amber-700/50 hover:text-amber-300'
                      : 'bg-blue-950/10 border-blue-900/30 text-blue-400/70 hover:bg-blue-950/30 hover:border-blue-800/50 hover:text-blue-300'
                }`}
              >
                <span className="font-bold">{STORY_CHARACTERS[story.id] || story.title}</span>
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <Plus className="w-3.5 h-3.5 opacity-60 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* The Matrix Table representation */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-inner" id="compare_matrix_table_wrapper">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 divide-x divide-slate-850">
              {/* Beats Header - STICKY */}
              <th className="p-4 w-[210px] min-w-[210px] align-top text-sm font-sans font-bold text-slate-400 uppercase tracking-wider bg-slate-900 sticky left-0 z-20 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.5)] border-r border-slate-800">
                Hero's Journey Beat
              </th>
              {/* Dynamic story headers */}
              {selectedStoryIds.map(storyId => {
                const story = FAMILIAR_STORIES.find(s => s.id === storyId);
                if (!story) return null;
                return (
                  <th key={story.id} className={`p-4 w-[280px] min-w-[280px] text-sm font-sans uppercase tracking-wider bg-slate-950/60 transition-colors ${story.type === 'academic' ? 'border-t-2 border-t-amber-500' : 'border-t-2 border-t-blue-500'}`}>
                    <div className="flex flex-col gap-1">
                      <div className="text-white font-bold tracking-tight text-base font-sans">{STORY_CHARACTERS[story.id] || story.title}</div>
                      <div className={`text-xs uppercase font-bold tracking-widest ${story.type === 'academic' ? 'text-amber-500' : 'text-blue-400'}`}>
                        {story.type === 'academic' ? 'Example' : story.title}
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {HERO_BEATS.map((beat) => {
              const IconComp = beat.icon;
              return (
                <tr key={beat.id} className="divide-x divide-slate-850 hover:bg-slate-900/10 transition-colors">
                  {/* Beat descriptor column - STICKY */}
                  <td className="p-4 align-top bg-slate-900/95 sticky left-0 z-10 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.5)] border-r border-slate-800" id={`beat_row_header_${beat.id}`}>
                    <div className="space-y-1.5 bg-transparent">
                      <div className="flex items-center gap-1.5 text-sm font-sans font-bold text-teal-400">
                        <IconComp className="w-4 h-4 shrink-0 text-teal-400" />
                        <span>{beat.name}</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-snug font-sans">
                        {beat.description}
                      </p>
                    </div>
                  </td>

                  {/* Story descriptions cells */}
                  {selectedStoryIds.map(storyId => {
                    const story = FAMILIAR_STORIES.find(s => s.id === storyId);
                    if (!story) return null;
                    const detail = story.beats[beat.id];

                    if (!detail) {
                      return (
                        <td key={storyId} className="p-4 text-sm font-sans text-slate-500 italic bg-slate-950/20 align-top">
                          Beat Skipped / N/A
                        </td>
                      );
                    }

                    // Format text lines to render with bullet breaks
                    const listItems = detail.text.split('\n');

                    return (
                      <td key={storyId} className="p-4 text-sm font-sans leading-relaxed text-slate-300 align-top bg-slate-950/40">
                        {detail.isSubverted ? (
                          <div className="space-y-2 bg-transparent">
                            <span className="inline-block px-2 py-1 text-xs font-sans font-bold bg-emerald-950/80 border border-emerald-900/60 text-emerald-400 rounded uppercase tracking-wider">
                              Subverted / Altered
                            </span>
                            <div className="space-y-1 font-sans">
                              {listItems.map((item, idx) => (
                                <p key={idx} className="text-slate-200">{item}</p>
                              ))}
                            </div>
                            {detail.subversionNote && (
                              <p className="text-sm font-sans text-slate-400 leading-snug">
                                💡 {detail.subversionNote}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-1 font-sans">
                            {listItems.map((item, idx) => (
                              <p key={idx} className="text-slate-200">{item}</p>
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Subversion pedagogical tip */}
      <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-start gap-3" id="matrix_subversion_tip">
        <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <h4 className="font-sans font-bold text-slate-100 text-sm">Pro-Tip for Drafting beats: Use Raw Bullet Points!</h4>
          <p className="text-slate-400 font-sans leading-relaxed text-sm">
            Notice how simple and raw these beats are? To plot your own journey, don't worry about polished prose yet. Focus on naming the <span className="text-teal-400 font-semibold">raw actions</span> and choices—the exact moment the phone rang, your progressive commitments, physical actions like riding a broom, or the simple realization you brought back to help friends. Once the structure holds, the writing follows naturally!
          </p>
        </div>
      </div>
    </div>
  );
}
