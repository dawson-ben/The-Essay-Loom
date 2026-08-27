import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  User, 
  SkipForward, 
  Compass, 
  HelpCircle, 
  Eye, 
  MoveRight, 
  Check, 
  ArrowRight,
  ArrowLeft,
  Layers, 
  Film, 
  Zap,
  Activity,
  Heart,
  Flame,
  AlertTriangle,
  Lightbulb,
  CornerDownRight,
  RefreshCw,
  Search,
  Shuffle,
  Users,
  Info
} from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  tldr: string | React.ReactNode;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "The Hero’s Journey",
    tldr: (
      <>
        <p>In his famous 1949 book <em>The Hero with a Thousand Faces</em>, literature professor Joseph Campbell identified a pattern in great stories that spans cultures and centuries. It operates like a universal rhythm—a specific sequence of narrative beats proven to capture and hold human attention.</p>
        
        <p>When you hear "The Hero's Journey," you might imagine classic fantasy novels, blockbuster movies, or epic quests to save the world. But you don't need to have fought a literal dragon to use this roadmap. The very same narrative engine can help you tell the quiet, "everyday" stories of personal growth, overcoming private fears, or shifting perspectives in your life with resonant power, too.</p>
        
        <p>You don’t need to invent a new structure from scratch; you just need to map your truth onto these proven narrative beats.</p>
      </>
    )
  },
  {
    id: 2,
    title: "Comparing Narrative Arcs",
    tldr: "To truly understand the Hero's Journey, it helps to see it in action across several stories. In this chapter, explore how several complete arcs from familiar stories, and a few example essay outlines, map onto the same narrative beats. This comparative view reveals how different stories, despite their unique details, share the same underlying rhythm. Stories (and your essay) also don't have to follow a rigid template; look for examples where these stories subvert the pattern, skip stages, or ground them in everyday reality."
  },
  {
    id: 3,
    title: "Pixar's 22 Rules of Storytelling",
    tldr: "Once you've laid out your your timeline, you need the physics of emotional resonance. We’ll look at how to apply the 22 Rules of Storytelling from the master screenwriters at Pixar to writing a true college essay. We've listed Pixar's rules in their original order below; click \"Apply the Rules\" to reorganize them to see how they apply to our framework."
  },
  {
    id: 4,
    title: "Cinematic Techniques",
    tldr: "Write like a film director. We'll show you how to use 'Bullet Time' to make your climax memorable, and the 'Montage' to condense years of history or several moments into a few punchy images."
  },
  {
    id: 5,
    title: "Breaking the Rules",
    tldr: "The Hero's Journey is a structural framework, not a rigid algorithm. Once you understand the baseline, you can intentionally subvert expectations to make your essay unforgettable."
  },
  {
    id: 6,
    title: "Assembly & Reordering Options",
    tldr: "Your final essay doesn't have to be told in perfectly chronological order. We’ll show you how to flexibly arrange your raw ingredients to create powerful structural hooks."
  }
];

import HerosJourneyCompare, { FAMILIAR_STORIES, STORY_CHARACTERS } from './HerosJourneyCompare';

// Character mappings for Chapter 1
interface PopCharacter {
  id: string;
  name: string;
  film: string;
  beats: Record<string, string>;
  catalyst: string;
  winning: string;
  payoff: string;
  elixir: string;
}

const STORY_EXTRA_BEATS: Record<string, { catalyst: string; winning: string; payoff: string; elixir: string }> = {
  harry_potter: {
    catalyst: "Remembering his mother's protective love and Dumbledore's core reassurance that our choices define us.",
    winning: "Chooses to keep the stone safe within his pocket rather than seeking its power.",
    payoff: "Saves the Philosopher's Stone from Voldemort and prevents his immediate return.",
    elixir: "Realizes that real courage, love, and true friendship are more powerful than any dark magical skill, returning to the Dursleys with a secure sense of self-worth."
  },
  legally_blonde: {
    catalyst: "Professor Stromwell's bold encouragement at the beauty salon, reminding Elle of her true analytical talent.",
    winning: "Refuses to quit, wears a bright-pink litigation dress to court, and takes over the defense.",
    payoff: "Saves the trial and unmasks the true killer in court using her specific knowledge of perm maintenance.",
    elixir: "Graduates near the top of her class and realizes she doesn’t need to dilute her bubblegum personality to be brilliant."
  },
  spiderman: {
    catalyst: "Uncle Ben's echoing phrase: 'With great power comes great responsibility.'",
    winning: "Grabs both lines with bleeding hands and pulls them to safety, refusing Green Goblin's cruel choice.",
    payoff: "Saves both Mary Jane and the children's tram, defeating Green Goblin and securing the city's peace.",
    elixir: "Accepts the heavy responsibility of his calling, resolving to protect New York at all personal costs."
  },
  lord_of_the_rings_frodo: {
    catalyst: "The sheer memory of the Shire's peaceful gardens, and his enduring trust in Sam's steadfast devotion.",
    winning: "Drives himself to the cracking lip of the Mt. Doom caldera to dispose of the ring.",
    payoff: "Gollum's desperate ambush accidentally destroys the Ring in the fire when Frodo's willpower momentarily collapses.",
    elixir: "Realizes that absolute mercy (having spared Gollum) can save kingdoms when pure willpower fails, returning to write the Shire's history with deep wisdom."
  },
  lord_of_the_rings_sam: {
    catalyst: "His simple, unshakeable promise to Gandalf never to leave Frodo's side, even in the darkest shadow.",
    winning: "Refuses to let physical collapse win. Hoists Frodo directly onto his back up the slopes of Mount Doom and fights off Gollum's desperate final ambush.",
    payoff: "Succeeds in supporting the Ringbearer to the very edge, saving Frodo and enabling the destruction of the Ring.",
    elixir: "Realizes that ordinary, simple devotion can endure any tyrant, returning to rebuild the Shire gardens and serve as its long-term Mayor."
  },
  lord_of_the_rings_aragorn: {
    catalyst: "Receiving the legendary reforged royal sword Andúril from Elrond, signaling his ready acceptance of his lineage.",
    winning: "Leads a desperate, suicidal charge at the Black Gate solely to buy Frodo time to complete the quest.",
    payoff: "The distraction succeeds completely, drawing Sauron's eye away from Mount Doom.",
    elixir: "Accepts the crown of Gondor and marries Arwen, overcoming his fear of inherited weakness and uniting the divided kingdoms of Men."
  },
  neville_longbottom: {
    catalyst: "Realizing that courage isn't the absence of fear, but standing firm when everything is on the line.",
    winning: "Shatters Voldemort's body-bind curse, pulls Gryffindor's ancient sword from the Sorting Hat.",
    payoff: "Slices off Nagini's head, destroying the final Horcrux and turning the battle.",
    elixir: "Establishes himself as a legendary leader, eventually becoming Hogwarts' beloved Herbology Professor."
  },
  the_hobbit: {
    catalyst: "The hard-earned resourcefulness and confidence gained by surviving Gollum's dark riddle game.",
    winning: "Steals the legendary Arkenstone and uses it as leverage to broker peace between opposing factions.",
    payoff: "Averts a terrible war with dwarf, elf, and human factions, allowing peaceful negotiations.",
    elixir: "Returns to his cozy Shire home with a newfound courage and a world-weary wisdom, writing his memoirs."
  },
  onward: {
    catalyst: "Uncovering Barley's childhood memories, realizing that his older brother has been his true guide and father figure.",
    winning: "Voluntarily steps aside to let Barley spend those final precious minutes with their dad, fighting the dragon alone.",
    payoff: "Barley finally gets his long-desired goodbye with their late father, and the ruins-dragon is defeated.",
    elixir: "Unlocks full magical mastery and a deep, unshakeable bond with his brother."
  },
  luke_skywalker: {
    catalyst: "Obi-Wan Kenobi's spectral voice reminding him to trust his feelings and use the Force.",
    winning: "Turns off his targeting computer entirely, trusting the Force to guide his hand.",
    payoff: "Fires the proton torpedoes that destroy the massive Death Star.",
    elixir: "Commits fully to his training as a Jedi, returning with a brand new, quiet, spiritual confidence."
  },
  rey_skywalker: {
    catalyst: "Hearing the whispered support of all the ancient Jedi generations who came and struggled before her.",
    winning: "Deflects the Emperor's dark lightning by crossing two lightsabers, declaring herself as 'all the Jedi'.",
    payoff: "Utterly destroys the Emperor's massive threat, ending the Sith's reign on Exegol.",
    elixir: "Buries the Skywalker sabers on Tatooine, igniting her own yellow saber with her chosen name, 'Rey Skywalker'."
  },
  up_carl: {
    catalyst: "Reading Ellie's final written note in her adventure book: 'Thanks for the adventure—now go have a new one!'",
    winning: "Dumps all his cherished antique furniture out of his flying house to make it light enough to fly again.",
    payoff: "Rescues Russell and Kevin from Charles Muntz's airship, leaving his physical house to hover safely.",
    elixir: "Realizes that life's true adventure is found in relationships, returning home to act as Russell's proud surrogate grandfather."
  },
  big_hero_6: {
    catalyst: "Reminiscing on old videos of Tadashi's tireless, selfless creation of Baymax, reminding him of his brother's caring legacy.",
    winning: "Tearfully sacrifices Baymax to propel Callaghan's daughter Abigail's survival pod out of the collapsing portal.",
    payoff: "Successfully rescues Abigail, saving her life from certain doom inside the unstable dimension.",
    elixir: "Rebuilds Baymax using his saved healthcare chip, dedicating his life and genius to a superhero team of healing."
  },
  napoleon_dynamite: {
    catalyst: "Pedro's absolute distress at having prepared nothing for the final key election assembly.",
    winning: "Steps onto the stage alone and performs a fiercely uninhibited, perfectly timed dance routine.",
    payoff: "Scores a thunderous standing ovation from the entire student body, securing Pedro's victory as Class President.",
    elixir: "Discovers his eccentricities are an asset, fully secure and happy in his unique, quirky identity."
  },
  aladdin: {
    catalyst: "Recognizing that Jafar's insatiable, boundless thirst for power is his absolute fatal weakness.",
    winning: "Goads Jafar into wishing to become an all-powerful genie, trapping him inside a lamp's bounds.",
    payoff: "Vanquishes Jafar and frees Agrabah from his tyranny, saving Jasmine and the Sultan.",
    elixir: "Uses his final wish to grant the Genie his freedom, proving his noble character to earn Jasmine's hand."
  },
  rudy: {
    catalyst: "Head groundskeeper Fortune's stern warning, sharing his own lifetime of agonizing regret after quitting the team.",
    winning: "Returns to the practice squad to prep the starting defense, prompting the senior players to give him a dress spot.",
    payoff: "Sacks the opposing quarterback in the game's final play, getting carried off the field on his teammates' shoulders.",
    elixir: "Proves to himself and his family that relentless, gritty perseverance can overcome any physical limitation."
  }
};

const POP_CHARACTERS: PopCharacter[] = FAMILIAR_STORIES
  .filter(story => !story.id.startsWith('student_'))
  .map(story => {
    const extra = STORY_EXTRA_BEATS[story.id];
    return {
      id: story.id,
      name: STORY_CHARACTERS[story.id] || story.title,
      film: story.title,
      beats: {
        ord: story.beats.ordinary_world?.text?.replace(/• /g, '')?.split('\n')?.join(' ') || '',
        inc: story.beats.inciting_incident?.text?.replace(/• /g, '')?.split('\n')?.join(' ') || '',
        doubt: story.beats.dont_hesitation?.text?.replace(/• /g, '')?.split('\n')?.join(' ') || '',
        commit: story.beats.commitment_crossing?.text?.replace(/• /g, '')?.split('\n')?.join(' ') || '',
        unfamiliar: story.beats.special_world?.text?.replace(/• /g, '')?.split('\n')?.join(' ') || '',
        ordeal: story.beats.ordeal_climax?.text?.replace(/• /g, '')?.split('\n')?.join(' ') || '',
      },
      catalyst: extra?.catalyst || "The internal breakthrough, advice, or memory that guides the hero's path.",
      winning: extra?.winning || story.beats.winning_action?.text?.replace(/• /g, '')?.split('\n')?.join(' ') || '',
      payoff: extra?.payoff || "The immediate triumphant result of surviving the ordeal.",
      elixir: extra?.elixir || story.beats.transformation_elixir?.text?.replace(/• /g, '')?.split('\n')?.join(' ') || '',
    };
  });

// Pixar rules list for Chapter 2
interface PixarRule {
  num: number;
  rule: React.ReactNode;
  fadedByDefault: boolean;
}

const PIXAR_RULES: PixarRule[] = [
  { num: 1, rule: "You admire a character for trying more than for their successes.", fadedByDefault: false },
  { num: 2, rule: "You gotta keep in mind what’s interesting to you as an audience, not what’s fun to do as a writer.", fadedByDefault: false },
  { num: 3, rule: "Trying for theme is important, but you won’t see what the story is actually about until you’re at the end of it. Now rewrite.", fadedByDefault: false },
  { num: 4, rule: "Once upon a time there was ___. Every day, ___. One day ___. Because of that, ___. Until finally ___.", fadedByDefault: false },
  { num: 5, rule: <>Simplify. Focus. <span className="line-through decoration-slate-500/80">Combine characters.</span> Hop over detours. You’ll feel like you’re losing valuable stuff but it sets you free.</>, fadedByDefault: false },
  { num: 6, rule: "What is your character good at, comfortable with? Throw the polar opposite at them. Challenge them. How do they deal?", fadedByDefault: false },
  { num: 7, rule: "Come up with your ending before you figure out your middle. Endings are hard, get yours working up front.", fadedByDefault: false },
  { num: 8, rule: "Finish your story, let go even if it’s not perfect. In an ideal world you’d have both, but you must move on.", fadedByDefault: false },
  { num: 9, rule: "When you’re stuck, make a list of what wouldn’t happen next. Lots of times the material to get you unstuck will show up.", fadedByDefault: true },
  { num: 10, rule: "Pull apart the stories you like. What you like in them is a part of you; you’ve got to recognize it before you can use it.", fadedByDefault: false },
  { num: 11, rule: "Putting it on paper lets you start fixing it. If it stays in your head, a perfect idea, you’ll never share it with anyone.", fadedByDefault: false },
  { num: 12, rule: "Discount the 1st, 2nd, 3rd, 4th, 5th thing that comes to mind. Get the obvious out of the way. Surprise yourself.", fadedByDefault: true },
  { num: 13, rule: "Give your characters opinions. Passive/malleable might seem likable to you as you write, but it’s poison to the audience.", fadedByDefault: false },
  { num: 14, rule: "Why must you tell THIS story? What’s the belief burning inside you that your story feeds off of? That’s the heart of it.", fadedByDefault: false },
  { num: 15, rule: "If you were your character, in this situation, how would you feel? Honesty lends credibility to unbelievable situations.", fadedByDefault: true },
  { num: 16, rule: "What are the stakes? Give us reason to root for the character. What happens if they don’t succeed? Stack the odds against.", fadedByDefault: false },
  { num: 17, rule: "No work is ever wasted. If it’s not working, let go and move on - it’ll come back around to be useful later.", fadedByDefault: false },
  { num: 18, rule: "You have to know yourself: the difference between doing your best vs. fussing. Story is testing, not refining.", fadedByDefault: false },
  { num: 19, rule: "Coincidences to get characters into trouble are great; coincidences to get them out of them is cheating.", fadedByDefault: false },
  { num: 20, rule: "Exercise: take building blocks of a movie you dislike. How do you rearrange them into what you DO like?", fadedByDefault: true },
  { num: 21, rule: "You gotta identify with your situation/characters, can't just write 'cool.' What would make YOU act that way?", fadedByDefault: true },
  { num: 22, rule: "What's the essence of your story? What’s the most economical way of telling it? If you know that, build from there.", fadedByDefault: false }
];

const PIXAR_COMMENTARY: Record<number, string> = {
  1: "Admissions officers don't just want to read a list of your accomplishments. They want to see your resilience, how you navigate failure, and the effort you put in when things get hard.",
  16: "If there's no risk of failure, there's no tension. Clarify what you stand to lose—be it a belief, a relationship, or an opportunity—so the reader is invested in your outcome.",
  20: "If your essay feels cliché or melodramatic, break it down into its core components. Try removing the exaggerated emotions and focus purely on the grounded, factual tension.",
  4: "This is Pixar's summary of the Hero's Journey. It develops your Ordinary World ('every day...'), an inciting incident ('until one day...), a sequence of struggles (because of that...), and a definitive climax and resolution (until finally...).",
  7: "Identify your Elixir first. Once you know exactly how you have changed and what realization you walked away with, outlining the messy middle becomes vastly easier.",
  14: "What's the unique perspective or capability you can offer this school? The elixir you can bring to benefit their student body? If you can find that, you know the heart of your story.",
  2: "A beautiful, poetic description of a landscape might be fun to write, but if it doesn't advance your character's arc, it's boring for the reader. Prioritize utility over flowery prose.",
  6: "Growth happens outside your comfort zone. Show us the times you lacked the necessary tools or skills, proving your ability to adapt under pressure (or showing how you struggled at first).",
  13: "Demonstrate agency. Strong personal statements feature protagonists who make active, opinionated choices to change their circumstances rather than waiting to be saved.",
  19: "An Inciting Incident or an Ordeal can come from a totally random stroke of bad luck. But your Winning Action must be the direct result of your own active decisions, skills, or growth.",
  3: "Don't stress if the 'point' of your essay isn't obvious right away. Get started, discover the underlying transformation, and then rewrite to emphasize it.",
  5: "Essays have strict word counts. Delete entire subplots and cut detours to keep the lens intensely focused on your core transformation. (Note: While Pixar suggests 'combining characters', non-fiction essays must be true. Don't invent hybrid people; simply omit unnecessary peers.)",
  8: "Avoid getting trapped in infinite revision loops on a single paragraph. Break the curse of the blank page by finishing the 'Draft Zero' before you start polishing.",
  10: "If you're struggling to find your transformation, think about stories and heroes you love. What about them resonates with you? Maybe it's because you had a parallel transformation.",
  11: "An imperfect written draft is infinitely more valuable than a flawless concept in your imagination. Our whole goal here is to help you get started.",
  17: "If a paragraph or anecdote derails your current essay, cut it out and save it in your Scratchpad. You might use it in a different prompt.",
  18: "Don't fuss over grammar in the early stages. Ensure the structural bones of your arc make sense before you obsess over word choice.",
  22: "Identify the absolute core of your journey. Trim away the setup, context, and preamble until you're left with the most aerodynamic version of your narrative. That gives you clarity. After that we can add back in the parts that are most beneficial."
};

export default function InteractiveGuidebook() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [activeChapterId, setActiveChapterId] = useState<number>(1);

  const [selectedChars, setSelectedChars] = useState<string[]>(['harry_potter', 'legally_blonde', 'spiderman']);
  const [activeBeat, setActiveBeat] = useState<number>(0);
  
  // Chapter 2 filter parameters
  const [pixarFiltered, setPixarFiltered] = useState<boolean>(false);
  const [pixarGrouped, setPixarGrouped] = useState<boolean>(false);

  // Chapter 4 subversion interactive card
  const [selectedSubversion, setSelectedSubversion] = useState<string>('failed_ordeal');

  // Chapter 5 interactive reorder
  const [selectedStructuralPattern, setSelectedStructuralPattern] = useState<string>('hj-chronological');

  const toggleCharSelection = (id: string) => {
    if (selectedChars.includes(id)) {
      if (selectedChars.length <= 1) return; // keep one minimum
      setSelectedChars(prev => prev.filter(c => c !== id));
    } else {
      if (selectedChars.length >= 6) return; // caps select
      setSelectedChars(prev => [...prev, id]);
    }
  };

  // Helper trigger for Pixar Filter Animation
  const startPixarFilter = () => {
    setPixarFiltered(true);
    setPixarGrouped(true);
  };

  const resetPixarAnimation = () => {
    setPixarFiltered(false);
    setPixarGrouped(false);
  };

  const BEATS_EXPLANATIONS = [
    { name: "1. Ordinary World", key: "ord", desc: "We meet the hero in their normal, everyday life. It may not be ideal, but it's familiar: the hero already knows how to handle this world. We often get hints of how this comfort zone is quietly restrictive or flawed." },
    { name: "2. Inciting Incident", key: "inc", desc: "The call to adventure. Someone invites the hero on some kind of adventure outside their familiar world. This is Gandalf telling Bilbo Baggins he's been nominated as the company's burglar. It's the flood of letters inviting Harry to Hogwart's. Or, more often, a problem or event disrupts the status quo, forcing the hero outside their comfort zone." },
    { name: "3. Hesitation", key: "doubt", desc: "The hero fears the unknown or is reluctant to change, often asking variations of, 'Why me?' This is Harry Potter saying, 'I can't be a wizard. I mean I'm just Harry.' This is important, because is shows us the hero isn't perfect, nor invincible. A hero who can't lose is BORING. A hero who can't grasp the danger is stupid.", essayDesc: "In a personal essay, admitting your hesitation builds trust with the reader. It shows you know you're not invulnerable, and that's part of what makes us root for you." },
    { name: "4. Threshold", key: "commit", desc: "The hero commits to the journey and actively crosses a threshold into the unfamiliar world. This is Harry running straight at the wall at Platform 9 3/4, Frodo volunteering to take the ring, or Carl Fredricksen releasing the thousands of helium balloons to take his house away." },
    { name: "5. Unfamiliar World", key: "unfamiliar", desc: "The hero faces challenges, handles everyday friction, fails a few times, and learns to work with allies, as they navigate the unfamiliar world.", essayDesc: "Because word count limits are a thing, you'll often need to abbreviate this part of your story, but we try not to eliminate it altogether."},
    { name: "6. Ordeal", key: "ordeal", desc: "The moment of greatest vulnerability, the highest risk, the hero's greatest challenge—the 'final boss' moment of the story.", essayDesc: "In your story, this needn't be life-or-death, but it needs to be the moment where you needed courage the most." },
    { name: "7. Catalyst", key: "catalyst", desc: "The thing that allows the hero to win. In books or films, this might a \"magic sword\" or some other helpful artifact, although often it's an inner belief, choice, or memory.", essayDesc: "This is the internal tool (like an insight, memory, piece of advice, or core value) that unlocks your ability to move forward at your lowest point." },
    { name: "8. Winning Action", key: "winning", desc: "The specific, agency-driven choice the hero makes to overcome the Ordeal.", essayDesc: "What did you actually do to solve the problem?" },
    { name: "9. Payoff", key: "payoff", desc: "The immediate result of surviving the ordeal: Slaying the dragon, standing on the podium, the townspeople cheering for the hero, or winning the house cup.", essayDesc: "The immediate, short-term prize of your winning action (e.g., winning the game, getting the grade, fixing the car)." },
    { name: "10. Elixir & Return", key: "elixir", desc: "The long-term transformation and the real prize. The hero returns home with new power, perspective, or wisdom to benefit their community.", essayDesc: "What new conviction, widsom, insight, or strength did you gain as a result of your journey? How will you use it to beneft your current future community?" }
  ];

  const currentChapter = CHAPTERS.find(ch => ch.id === activeChapterId) || CHAPTERS[0];
  const isFirst = currentChapter.id === 1;
  const isLast = currentChapter.id === CHAPTERS.length;


  const getTabClass = (isActive: boolean) => 
    `py-1.5 px-2 text-sm font-sans font-bold rounded-lg transition-colors cursor-pointer text-center border ${
      isActive 
        ? 'bg-blue-600 border-blue-600 text-blue-50 shadow-md'
        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
    }`;

  return (
    <div id="interactive_guidebook_view" className="w-full mx-auto p-4 md:p-8 space-y-12 pb-32 animate-fade-in">
      
      {/* Active Chapter Container */}
      <div className="bg-slate-900 border border-blue-500/20 shadow-xl shadow-blue-950/5 rounded-2xl overflow-hidden mt-8">
        
        {/* Chapter Header */}
        <div className="p-6 md:p-8 bg-slate-950/80 border-b border-slate-850/60 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              {CHAPTERS.map(ch => (
                <div 
                  key={ch.id} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    ch.id === currentChapter.id 
                      ? 'w-6 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' 
                      : ch.id < currentChapter.id 
                        ? 'w-1.5 bg-blue-900/60' 
                        : 'w-1.5 bg-slate-800'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500 ml-2 font-bold font-sans uppercase tracking-wider">
              Chapter {currentChapter.id} of {CHAPTERS.length}
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight">
            {currentChapter.title}
          </h3>
          <div className="text-sm text-slate-300 leading-relaxed font-sans space-y-4">
            {typeof currentChapter.tldr === 'string' ? currentChapter.tldr.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            )) : currentChapter.tldr}
          </div>
        </div>

        {/* Chapter Content Component Body */}
        <div className="p-6 md:p-8 bg-[#0a0e1a]/45 space-y-8 animate-fade-in relative">
          
          {/* Chapter 1: Hero's Journey Content */}
          {currentChapter.id === 1 && (
            <div className="space-y-8" id="expanded_chapter_1_view">
              
                        {/* Beat-by-Beat walkthrough timeline */}
                        <div className="space-y-6">
                          <div className="border-b border-slate-800 pb-3">
                            <h4 className="text-sm font-sans font-bold text-white flex items-center gap-2">
                              <Compass className="w-4 h-4 text-cyan-400" />
                              The Journey's Narrative Beats
                            </h4>
                            <p className="text-[15px] sm:text-base text-slate-400">Click through the narrative stages below and choose characters to see examples.</p>
                          </div>

                          {/* Horizontal Beats Pills */}
                          <div className="flex gap-1.5 overflow-x-auto pb-2.5 scrollbar-thin scrollbar-thumb-slate-800">
                            {BEATS_EXPLANATIONS.map((b, bIdx) => (
                              <button
                                key={bIdx}
                                onClick={() => setActiveBeat(bIdx)}
                                className={`px-3 py-1.5 text-sm font-sans font-semibold rounded-lg shrink-0 border transition-all cursor-pointer ${
                                  activeBeat === bIdx 
                                    ? 'bg-blue-500 text-slate-950 border-blue-400 font-bold shadow-lg shadow-blue-500/10' 
                                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                                }`}
                              >
                                {b.name.split('. ')[1]}
                              </button>
                            ))}
                          </div>

                        {/* Selected Beat Explanation panel */}
                        {(() => {
                          const cur = BEATS_EXPLANATIONS[activeBeat];
                        
  const getTabClass = (isActive: boolean) => 
    `py-1.5 px-2 text-sm font-sans font-bold rounded-lg transition-colors cursor-pointer text-center border ${
      isActive 
        ? 'bg-blue-600 border-blue-600 text-blue-50 shadow-md'
        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
    }`;

  return (
                            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-6">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                                  <div className="text-sm uppercase font-sans tracking-widest font-extrabold text-cyan-400">
                                    Stage {activeBeat + 1} of 10
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setActiveBeat(prev => Math.max(0, prev - 1))}
                                      disabled={activeBeat === 0}
                                      className="px-2.5 py-1 text-sm font-sans font-semibold rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-705 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:text-slate-300 disabled:hover:border-slate-800 transition-all flex items-center gap-1 cursor-pointer"
                                      title="Previous Beat"
                                    >
                                      <ArrowLeft className="w-3.5 h-3.5" />
                                      <span>Back</span>
                                    </button>
                                    <button
                                      onClick={() => setActiveBeat(prev => Math.min(BEATS_EXPLANATIONS.length - 1, prev + 1))}
                                      disabled={activeBeat === BEATS_EXPLANATIONS.length - 1}
                                      className="px-2.5 py-1 text-sm font-sans font-semibold rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-705 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:text-slate-300 disabled:hover:border-slate-800 transition-all flex items-center gap-1 cursor-pointer"
                                      title="Next Beat"
                                    >
                                      <span>Next</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                                <h4 className="text-base font-sans font-extrabold text-white">
                                  {cur.name}
                                </h4>
                                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                                  {cur.desc}
                                </p>
                                {cur.essayDesc && (
                                  <div className="bg-blue-950/30 border border-blue-500/20 p-3 rounded-xl mt-3 space-y-1">
                                    <div className="text-sm font-sans tracking-widest font-bold text-blue-400 uppercase">
                                      In Your Essay
                                    </div>
                                    <p className="text-sm text-blue-200/90 leading-relaxed font-sans">
                                      {cur.essayDesc}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Dynamic character mappings */}
                              <div className="space-y-4 border-t border-slate-850 pt-5">
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {POP_CHARACTERS.filter(c => selectedChars.includes(c.id)).map(char => {
                                    // Get text corresponding to key (ord, inc, doubt, commit, unfamiliar, ordeal, catalyst, payoff, elixir/ord etc)
                                    let charText = '';
                                    if (cur.key === 'ord') charText = char.beats.ord;
                                    else if (cur.key === 'inc') charText = char.beats.inc;
                                    else if (cur.key === 'doubt') charText = char.beats.doubt;
                                    else if (cur.key === 'commit') charText = char.beats.commit;
                                    else if (cur.key === 'unfamiliar') charText = char.beats.unfamiliar;
                                    else if (cur.key === 'ordeal') charText = char.beats.ordeal;
                                    else if (cur.key === 'catalyst') charText = char.catalyst;
                                    else if (cur.key === 'winning') charText = char.winning;
                                    else if (cur.key === 'payoff') charText = char.payoff;
                                    else if (cur.key === 'elixir') charText = char.elixir;

                                  
  const getTabClass = (isActive: boolean) => 
    `py-1.5 px-2 text-sm font-sans font-bold rounded-lg transition-colors cursor-pointer text-center border ${
      isActive 
        ? 'bg-blue-600 border-blue-600 text-blue-50 shadow-md'
        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
    }`;

  return (
                                      <div key={char.id} className="bg-slate-900 border border-slate-850/80 p-4 rounded-xl space-y-2 hover:border-slate-800 transition-colors">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm font-bold text-slate-200">{char.name}</span>
                                        </div>
                                        <p className="text-sm text-slate-300 font-sans leading-relaxed">
                                          {charText}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Bottom Navigation */}
                              {/* Removed bottom navigation as requested */}
                            </div>
                          );
                        })()}
                        </div>
                        
                        {/* Interactive Character Selector tool */}
                        <div className="space-y-3 bg-slate-950/60 px-5 py-4 rounded-2xl border border-slate-850">
                          <div className="space-y-1">
                            <p className="text-sm text-slate-300 font-sans">
                              Select up to 6 characters to compare in the visualizer above.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-1 h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                            {POP_CHARACTERS.map(char => {
                              const isSelected = selectedChars.includes(char.id);
                            
  const getTabClass = (isActive: boolean) => 
    `py-1.5 px-2 text-sm font-sans font-bold rounded-lg transition-colors cursor-pointer text-center border ${
      isActive 
        ? 'bg-blue-600 border-blue-600 text-blue-50 shadow-md'
        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
    }`;

  return (
                                <button
                                  key={char.id}
                                  onClick={() => toggleCharSelection(char.id)}
                                  className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-start relative hover:scale-[1.02] cursor-pointer ${
                                    isSelected 
                                      ? 'bg-blue-950/25 border-blue-500 text-white shadow-md shadow-blue-950/30' 
                                      : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800'
                                  }`}
                                >
                                  <div className="pr-4">
                                    <div className="font-sans font-bold text-sm leading-tight">{char.name}</div>
                                  </div>
                                  <div className="text-sm text-slate-500 font-sans mt-0.5 truncate w-full">{char.film}</div>
                                  {isSelected && (
                                    <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-slate-950 font-bold text-[11px]">
                                      ✓
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    )}


                    {/* Chapter 2: Comparing Narrative Arcs */}
                    {currentChapter.id === 2 && (
                      <div className="space-y-8 animate-fade-in" id="expanded_chapter_2_view">
                        <HerosJourneyCompare />
                      </div>
                    )}

                    {/* Chapter 3: The Pixar Principles */}
                    {currentChapter.id === 3 && (
                      <div className="space-y-8" id="expanded_chapter_3_view">
                        
                        {/* Interactive Grid Area */}
                        <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-850 overflow-hidden relative">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <h4 className="text-sm font-sans font-bold text-white flex items-center gap-2">
                                <Activity className="w-4 h-4 text-blue-400" />
                                Pixar's 22 Rules
                              </h4>
                            </div>

                            <div className="flex items-center gap-2">
                              {!pixarFiltered ? (
                                <button
                                  onClick={startPixarFilter}
                                  className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 rounded-lg text-sm font-sans font-bold hover:opacity-95 transition-all cursor-pointer flex items-center gap-1 shadow-lg shadow-cyan-900/10"
                                >
                                  Apply the Rules
                                </button>
                              ) : (
                                <button
                                  onClick={resetPixarAnimation}
                                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg text-sm font-sans transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                  Reset Deck
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Rules Deck display */}
                          <LayoutGroup>
                            <div className="relative min-h-[400px]">
                              {!pixarGrouped ? (
                                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                                  <AnimatePresence>
                                    {PIXAR_RULES.map(r => (
                                      <motion.div 
                                        layoutId={`rule-${r.num}`}
                                        key={r.num}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.8, type: "spring", bounce: 0.15 }}
                                        className="px-3 py-2 bg-slate-900 border border-slate-800/80 text-slate-300 rounded-lg text-left shadow-sm flex flex-col justify-center"
                                      >
                                        <div className="text-sm font-sans font-bold mb-0.5 text-slate-500">Rule #{r.num}</div>
                                        <p className="text-[15px] leading-relaxed font-sans">{r.rule}</p>
                                      </motion.div>
                                    ))}
                                  </AnimatePresence>
                                </motion.div>
                              ) : (
                                <motion.div layout className="space-y-6">

                                  <div className="space-y-5 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                                    {/* Groups */}
                                    {[
                                      { id: 1, title: "Phase 1: Your Core Narrative", color: "bg-rose-500", rules: [11, 4, 14, 16, 7, 22], desc: "Outline the core narrative arc and underlying tension before you write. Define your transformation (The Elixir) early so you can work backward, and establish clear stakes so the audience is invested in your success." },
                                      { id: 2, title: "Phase 2: Character & Struggle", color: "bg-cyan-500", rules: [5, 6, 1, 13, 19], desc: "Put yourself to the test. Ensure you are making active decisions rather than waiting to be saved. Growth requires vulnerability, pressure, and stepping outside of your comfort zone." },
                                      { id: 3, title: "Phase 3: Draft Zero", color: "bg-blue-500", rules: [10, 8, 3], desc: "Break the curse of the blank page. Outlining is about testing, not refining. Get the messy draft out of your head and onto paper so you have something real to fix." },
                                      { id: 4, title: "Phase 4: Focus & Polish", color: "bg-teal-500", rules: [2, 17, 18], desc: "Trim the fat. Merge detours, simplify prose, and prioritize utility over flowery language. Don't fuss over minor details until the fundamental structural bones are sound." },
                                    ].map(group => (
                                      <div key={group.id} className="space-y-4 pt-2">
                                        <div className="flex items-center gap-2 px-1">
                                          <span className={`w-2 h-2 rounded-full ${group.color}`}></span>
                                          <h5 className="font-sans font-bold text-base text-white">{group.title}</h5>
                                        </div>
                                        <p className="text-[15px] text-slate-400 font-sans px-1 pb-2">
                                          {group.desc}
                                        </p>
                                        <div className="space-y-3">
                                          {group.rules.map(ruleNum => {
                                            const r = PIXAR_RULES.find(rule => rule.num === ruleNum);
                                            if (!r) return null;
                                          
  const getTabClass = (isActive: boolean) => 
    `py-1.5 px-2 text-sm font-sans font-bold rounded-lg transition-colors cursor-pointer text-center border ${
      isActive 
        ? 'bg-blue-600 border-blue-600 text-blue-50 shadow-md'
        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
    }`;

  return (
                                            <div key={r.num} className="grid md:grid-cols-2 gap-4 items-center bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                                              <motion.div 
                                                layoutId={`rule-${r.num}`}
                                                transition={{ duration: 0.8, type: "spring", bounce: 0.15 }}
                                                className="p-3 bg-slate-900 border border-slate-800/80 text-slate-300 rounded-lg text-left shadow-sm h-full flex flex-col justify-center"
                                              >
                                                <div className="text-sm font-sans font-bold mb-1 text-slate-500">Rule #{r.num}</div>
                                                <p className="text-[15px] leading-relaxed font-sans">{r.rule}</p>
                                              </motion.div>
                                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="text-[15px] text-slate-300 leading-relaxed font-sans pr-4">
                                                {PIXAR_COMMENTARY[r.num]}
                                              </motion.div>
                                            </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </LayoutGroup>
                        </div>
                      </div>
                    )}


                    {/* Chapter 4: Cinematic Techniques */}
                    {currentChapter.id === 4 && (
                      <div className="space-y-6" id="expanded_chapter_4_view">
                        <div className="bg-slate-950 border border-slate-850 rounded-xl p-6 space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-sans font-bold text-white">Bullet Time</h4>
                            <p className="text-sm text-slate-400 font-sans leading-relaxed">
                              When you reach key points in your story (like the Ordeal or Crossing the Threshold), help the reader really sense the emotion or tension by slowing things way, way down. Think of when the slow-motion sequences in The Matrix or of when Spider-Man's spidey senses tingle and we suddenly zoom in on the details of the scene.</p>
                            <p className="text-sm text-slate-400 font-sans leading-relaxed">
                              Don't summarize by saying, "I got nervous." Instead, show rather than tell, by zooming in on the sensory details—smells, textures, colors, skin temperature, ambient sounds, and the tightening of muscles.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="bg-slate-900 border border-slate-850 p-4 rounded-lg space-y-2">
                              <span className="text-sm text-rose-400 font-sans uppercase tracking-wider block">❌ Abstract Telling (Lazy)</span>
                              <p className="text-sm text-slate-300 italic font-serif leading-relaxed">
                                "I got really anxious and nervous when the lesson started because I felt unqualified and feared I would fail."
                              </p>
                            </div>
                            <div className="bg-slate-900 border border-slate-850 p-4 rounded-lg space-y-2 border-l-4 border-l-blue-500">
                              <span className="text-sm text-cyan-400 font-sans uppercase tracking-wider block">✅ Grounded Showing Bullet Time (Resonant)</span>
                              <p className="text-sm text-blue-200 italic font-serif leading-relaxed">
                                "I rubbed the dry chalk off my fingertips and squeezed the cold metal railing of the pool deck. Forty elementary campers looked up at me simultaneously, their voices melting into a hot midday haze."
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-950 border border-slate-850 rounded-xl p-6 space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-sans font-bold text-white">Cinematic Montage</h4>
                            <p className="text-sm text-slate-400 font-sans leading-relaxed">
                              A montage efficiently strings together different time periods, events, images, or hobbies under one common theme. This helps you cover years of accomplishments (like establishing your Ordinary World) without boring the reader with dry chronological descriptions. Or it can help you establish an atmosphere for the scene.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="bg-slate-900 border border-slate-850 p-4 rounded-lg space-y-2">
                              <span className="text-sm text-rose-400 font-sans uppercase tracking-wider block">❌ Chronological Catalog (Dry)</span>
                              <p className="text-sm text-slate-300 italic font-serif leading-relaxed">
                                "I joined the robotic sciences club in 9th grade, then became director in 11th grade, and worked on the control interfaces team last summer."
                              </p>
                            </div>
                            <div className="bg-slate-900 border border-slate-850 p-4 rounded-lg space-y-2 border-l-4 border-l-blue-500">
                              <span className="text-sm text-cyan-400 font-sans uppercase tracking-wider block">✅ Thematic Montage Form (Resonant)</span>
                              <p className="text-sm text-blue-200 italic font-serif leading-relaxed">
                                "At fourteen, robotics was the smell of grease on a kitchen floor. At sixteen, it was the cold aluminum of chassis frames. At seventeen, it was thirty lines of code compiled at 2 AM before the launch."
                              </p>
                            </div>

                            <div className="bg-slate-900 border border-slate-850 p-4 rounded-lg space-y-2">
                              <span className="text-sm text-rose-400 font-sans uppercase tracking-wider block">❌ Generic Setting (Boring)</span>
                              <p className="text-sm text-slate-300 italic font-serif leading-relaxed">
                                "Before the debate tournament, it was very chaotic in the preparation room as everyone was stressed out and getting ready."
                              </p>
                            </div>
                            <div className="bg-slate-900 border border-slate-850 p-4 rounded-lg space-y-2 border-l-4 border-l-blue-500">
                              <span className="text-sm text-cyan-400 font-sans uppercase tracking-wider block">✅ Atmospheric Chaos (Resonant)</span>
                              <p className="text-sm text-blue-200 italic font-serif leading-relaxed">
                                "The prep room was a whirlwind of uncapped highlighters, scattered legal pads, and the frantic clicking of sixty laptop keyboards fighting the five-minute warning."
                              </p>
                            </div>

                            <div className="bg-slate-900 border border-slate-850 p-4 rounded-lg space-y-2">
                              <span className="text-sm text-rose-400 font-sans uppercase tracking-wider block">❌ Abstract Calm (Vague)</span>
                              <p className="text-sm text-slate-300 italic font-serif leading-relaxed">
                                "The football practice field was very quiet early in the morning before people arrived."
                              </p>
                            </div>
                            <div className="bg-slate-900 border border-slate-850 p-4 rounded-lg space-y-2 border-l-4 border-l-blue-500">
                              <span className="text-sm text-cyan-400 font-sans uppercase tracking-wider block">✅ Atmospheric Stillness (Resonant)</span>
                              <p className="text-sm text-blue-200 italic font-serif leading-relaxed">
                                "The practice field at dawn was nothing but frost clinging to the fifty-yard line, the distant hum of the stadium lights warming up, and my breath hanging suspended in the crisp air."
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-950/30 border border-blue-500/20 rounded-xl p-4 mt-6">
                          <h4 className="text-sm font-sans font-bold text-blue-300 flex items-center gap-2 mb-1">
                            <Info className="w-4 h-4" />
                            A Note on Word Economy
                          </h4>
                          <p className="text-sm text-slate-300 font-sans leading-relaxed">
                            Looking at these examples, you might think "showing" takes too many words. It's true that a Bullet Time sentence is longer than "I was nervous." However, a strong sensory description or a thematic montage actually <em className="text-blue-200">saves</em> words overall. By capturing the essence of an experience in a few vivid details, you eliminate the need for paragraphs of back-story and dry exposition. You trade 100 words of boring summary for 30 words of vivid imagery.
                          </p>
                        </div>
                      </div>
                    )}


                    {/* Chapter 5: Knowing When to Break the Rules */}
                    {currentChapter.id === 5 && (
                      <div className="space-y-6" id="expanded_chapter_5_view">
                        <div className="space-y-2">
                          <h4 className="text-sm font-sans font-bold text-white flex items-center gap-1.5 text-blue-400">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            Aesthetic Rule-Subversions Selector
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed font-sans">
                            A well-placed subversion—where you lead the reader down a familiar path and then pull the rug out—creates genuine surprise. You do NOT have to break any rules to make a great essay, but explore the approaches below to see some that might fit your story.
                          </p>
                        </div>

                        {/* Layout grid cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { id: 'failed_ordeal', label: "The Failed Ordeal" },
                            { id: 'wrong_dragon', label: "The Wrong Dragon" },
                            { id: 'unexpected_catalyst', label: "Unexpected Catalyst" },
                            { id: 'commitment_ordeal', label: "Commitment was Ordeal" }
                          ].map(sub => (
                            <button
                              key={sub.id}
                              onClick={() => setSelectedSubversion(sub.id)}
                              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                                selectedSubversion === sub.id
                                  ? 'bg-blue-950/40 border-blue-500 text-white shadow-md'
                                  : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800'
                              }`}
                            >
                              <span className="text-sm font-sans font-bold block">{sub.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Explained subversion choice view */}
                        {selectedSubversion === 'failed_ordeal' && (
                          <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-2 animate-fade-in text-sm font-sans">
                            <h5 className="font-bold text-slate-200">The "Failed" Ordeal Strategy</h5>
                            <p className="text-slate-300 leading-relaxed">
                              You do not actually have to <strong>win</strong> the battle to get the prize. Sometimes the most powerful essays happen when you completely fail the Ordeal, but the deep reflection on that failure becomes your Elixir. Losing the tournament, breaking the prototype, or having your campers stage a mutiny can teach you vastly more about leadership and resilience than a flawless, easy victory.
                            </p>
                            <div className="mt-3 bg-blue-950/20 p-3 rounded border border-blue-900/30 text-sm font-sans text-blue-300">
                              <strong>Core Principle:</strong> High-level maturity shines through failure. Relentless vulnerability beats a fake trophy.
                            </div>
                          </div>
                        )}

                        {selectedSubversion === 'wrong_dragon' && (
                          <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-2 animate-fade-in text-sm font-sans">
                            <h5 className="font-bold text-slate-200">The Wrong Dragon Strategy</h5>
                            <p className="text-slate-300 leading-relaxed">
                              You spend the whole essay preparing for one specific challenge, but when you arrive at the Ordeal, the test is entirely different. You spent weeks memorizing the technical manual to pass a robotics inspection, but the real test ended up being navigating the interpersonal conflict of your stressed-out team.
                            </p>
                            <div className="mt-3 bg-blue-950/20 p-3 rounded border border-blue-900/30 text-sm font-sans text-blue-300">
                              <strong>Core Principle:</strong> Highlights self-awareness. It proves you can step back and see the larger human picture.
                            </div>
                          </div>
                        )}

                        {selectedSubversion === 'unexpected_catalyst' && (
                          <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-2 animate-fade-in text-sm font-sans">
                            <h5 className="font-bold text-slate-200">The Unexpected Catalyst Strategy</h5>
                            <p className="text-slate-300 leading-relaxed">
                              The realization that saves you doesn't have to be a profound quote from a mentor or a sudden stroke of genius. It can be a joke, a mundane observation, or even the realization that the advice you were given is actually completely wrong. Using a "broken" compass to find your way out of the woods shows deep, independent critical thinking.
                            </p>
                            <div className="mt-3 bg-blue-950/20 p-3 rounded border border-blue-900/30 text-sm font-sans text-blue-300">
                              <strong>Core Principle:</strong> Demonstrates raw intellectual independence and curiosity.
                            </div>
                          </div>
                        )}

                        {selectedSubversion === 'commitment_ordeal' && (
                          <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-2 animate-fade-in text-sm font-sans">
                            <h5 className="font-bold text-slate-200">The Commitment was the Ordeal</h5>
                            <p className="text-slate-300 leading-relaxed">
                              Sometimes the hardest part of the journey isn't the final test, but simply taking the first step. You might find that crossing the threshold (e.g., finally standing up to speak, submitting the flawed design, or admitting you need help) was the true climax of your story, and everything that followed was just the falling action.
                            </p>
                            <div className="mt-3 bg-blue-950/20 p-3 rounded border border-blue-900/30 text-sm font-sans text-blue-300">
                              <strong>Core Principle:</strong> Shows immense internal courage. It turns a quiet personal block into a massive milestone.
                            </div>
                          </div>
                        )}

                        <div className="p-4 bg-blue-950/10 border border-blue-900/20 rounded-xl flex items-start gap-3 text-sm text-blue-200">
                          <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-blue-100">The Golden Rule of Breaking Rules:</strong> You can bend the plot, but you cannot bypass the transformation. You can fail the test, use the wrong tool, or fight the wrong battle, but you must still return with the Elixir. The internal growth is non-negotiable.
                          </div>
                        </div>
                      </div>
                    )}


                    {/* Chapter 6: Assembly & Reordering Options */}
                    {currentChapter.id === 6 && (
                      <div className="space-y-6" id="expanded_chapter_6_view">
                        <div className="space-y-2">
                          <h4 className="text-sm font-sans font-bold text-white flex items-center gap-1.5 text-blue-400">
                            <Shuffle className="w-4 h-4" />
                            Interactive Structural Blueprint Layouts
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed font-sans">
                            Your final essay doesn't have to be told in perfectly chronological order. Reorder your blocks in the workspace to test out these structural designs:
                          </p>
                        </div>

                        {/* Structural switch layout pills */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-chronological')}
                            className={getTabClass(selectedStructuralPattern === 'hj-chronological')}
                          >
                            Timeline Chain
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-in-media-res')}
                            className={getTabClass(selectedStructuralPattern === 'hj-in-media-res')}
                          >
                            In Media Res
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-post-mortem')}
                            className={getTabClass(selectedStructuralPattern === 'hj-post-mortem')}
                          >
                            The Post-Mortem
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-catalyst-anchor')}
                            className={getTabClass(selectedStructuralPattern === 'hj-catalyst-anchor')}
                          >
                            The Catalyst Anchor
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-reluctant-hook')}
                            className={getTabClass(selectedStructuralPattern === 'hj-reluctant-hook')}
                          >
                            The Reluctant Hook
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-parallel-track')}
                            className={getTabClass(selectedStructuralPattern === 'hj-parallel-track')}
                          >
                            The Parallel Track
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-sudden-setback')}
                            className={getTabClass(selectedStructuralPattern === 'hj-sudden-setback')}
                          >
                            Sudden Setback
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-student-passion')}
                            className={getTabClass(selectedStructuralPattern === 'hj-student-passion')}
                          >
                            Student Meets Passion
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-cinderella')}
                            className={getTabClass(selectedStructuralPattern === 'hj-cinderella')}
                          >
                            Cinderella
                          </button>
                        </div>

                        {selectedStructuralPattern === 'hj-chronological' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80">
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">1. Ordinary World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Inciting Incident</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3.5 py-1.5 bg-amber-900/35 border border-amber-700 text-amber-400 rounded-lg text-center font-bold shadow-sm">3. The Ordeal</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. The Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">The Standard Chronological Pattern</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                The classic timeline. You start in your comfort zone, get pulled into a new challenge, and face your ordeal at the climax. This is excellent for clear, step-by-step psychological growth stories. Readers can follow your trial sequences easily.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-in-media-res' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80">
                              <span className="px-3.5 py-1.5 bg-blue-900/35 border border-blue-700 text-blue-100 rounded-lg text-center font-extrabold shadow">1. Ordeal / Climax (Hook)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Ordinary World (Flashback)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">3. Catalyst/Action</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">In Media Res (The Action Hook)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Start right in the middle of the chaos. Open with your biggest complication, then flash back to how you got there. Gripping from the first sentence.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-post-mortem' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3.5 py-1.5 bg-rose-900/35 border border-rose-700 text-rose-100 rounded-lg text-center font-extrabold shadow-sm">1. Failed Ordeal (Hook)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Inciting Incident</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">3. Unfamiliar World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">The Post-Mortem (Failed Ordeal First)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Opens with the aftermath of failure. The essay starts with the sting of defeat, then flashes back to show how you rebuilt your approach to tackle the problem a second time. This is the ultimate "Resilience Story" structure.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-catalyst-anchor' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-amber-900/30 border border-amber-800/50 text-amber-400 rounded-lg text-center font-bold shadow-sm">1. Catalyst (Object/Memory)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Ordinary World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">3. Ordeal</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">The Catalyst Anchor (The Object Lesson)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Open with a hyper-focus on a specific physical object, a core memory, or a piece of advice. The narrative then zooms out, progressing until the Ordeal, where that exact object or memory is deployed to save the day. Works brilliantly for the "Intellectual Journey" track.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-reluctant-hook' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-teal-900/30 border border-teal-800/50 text-teal-400 rounded-lg text-center font-bold shadow-sm">1. Doubts & Hesitation</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Ordinary World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">3. Ordeal</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">The Reluctant Hook (Starting with Hesitation)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Start the essay at the moment of maximum internal resistance (actively refusing to do something, hiding, or stubbornly digging your heels in). Then flash back to explain the safe Ordinary World, and the event that finally forced you to cross the threshold. Highly effective for the "Quiet Power" track that embraces vulnerability.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-parallel-track' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-purple-900/30 border border-purple-800/50 text-purple-400 rounded-lg text-center font-bold shadow-sm">1. Ordinary World A vs B</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-emerald-900/30 border border-emerald-800/50 text-emerald-400 rounded-lg text-center font-bold shadow-sm">2. Incident A vs Ordeal B</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">3. Convergence</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">The Parallel Track (The Dual Timeline)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Alternate between two seemingly unrelated timelines or environments—like a quiet cultural home life (Timeline A) and a loud robotics lab (Timeline B). The two timelines alternate and escalate until the climax, where a skill learned in Timeline A solves the Ordeal in Timeline B. Demonstrates massive intellectual maturity.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-sudden-setback' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">1. Ordinary World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Inciting Incident</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3.5 py-1.5 bg-rose-900/35 border border-rose-700 text-rose-100 rounded-lg text-center font-extrabold shadow-sm">3. The Ordeal</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Winning Action</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">Sudden Setback</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                A character falls into a crisis and claws their way out. The Ordeal hits hard and early, making the essay about the grueling, deliberate process of climbing out of the hole, rather than building up to the fall.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-student-passion' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">1. Inciting Incident (Meeting the passion)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Unfamiliar World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3.5 py-1.5 bg-amber-900/35 border border-amber-700 text-amber-400 rounded-lg text-center font-bold shadow-sm">3. The Ordeal (Burnout/Competition)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">Student Meets Passion</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Finding a passion, losing it to burnout/competition, and rebuilding it on healthier, more mature terms. Excellent for tracing the evolution of a hobby or academic interest over several years.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-cinderella' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">1. Ordinary World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Unfamiliar World (False Peak)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3.5 py-1.5 bg-rose-900/35 border border-rose-700 text-rose-100 rounded-lg text-center font-extrabold shadow-sm">3. The Ordeal (Rock Bottom)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Winning Action (True Peak)</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">Cinderella (The False Peak)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                An initial unearned rise, a devastating fall to rock bottom, and a final earned rise. Shows humility, resilience, and the difference between superficial success and deep mastery.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
        </div>

        {/* Navigation Controls */}
        <div className="p-6 border-t border-slate-850/60 bg-slate-950/40 flex items-center justify-between mt-0">
          <button
            onClick={() => setActiveChapterId(prev => Math.max(1, prev - 1))}
            disabled={isFirst}
            className={`px-5 py-2.5 rounded-xl text-sm font-sans font-bold flex items-center gap-2 transition-colors ${
              isFirst ? 'opacity-50 cursor-not-allowed bg-slate-900/50 text-slate-500' : 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Chapter
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5">
            {CHAPTERS.map(ch => (
              <div 
                key={ch.id} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  ch.id === currentChapter.id 
                    ? 'w-4 bg-blue-500' 
                    : ch.id < currentChapter.id 
                      ? 'w-1.5 bg-blue-900/60' 
                      : 'w-1.5 bg-slate-800'
                }`}
              />
            ))}
          </div>

          {isLast ? (
            <button
              onClick={() => navigate(`/essay/${id || ''}/worksheet`)}
              className="px-5 py-2.5 rounded-xl text-sm font-sans font-bold flex items-center gap-2 transition-colors bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-900/10 cursor-pointer"
            >
              Start Workbook
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setActiveChapterId(prev => Math.min(CHAPTERS.length, prev + 1))}
              className="px-5 py-2.5 rounded-xl text-sm font-sans font-bold flex items-center gap-2 transition-colors bg-blue-600 hover:bg-blue-550 text-white shadow-md shadow-blue-900/10 cursor-pointer"
            >
              Next Chapter
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
    </div>
  );
}
