export interface CharacterGuide {
  id: string;
  name: string;
  category: string;
  work?: string;
  beats: Record<string, string>;
}

export const CHARACTER_GUIDES: CharacterGuide[] = [
  {
    id: "camp_counselor",
    name: "Camp Counselor (Student Essay)",
    category: "Academic",
    beats: {
      story_selection: "Teaching science at summer camp",
      transformation_formula: "I used to think I needed a perfect, organized plan and just wanted to keep the kids safe. But when things fell apart, I realized messy, active chaos actually unlocks their curiosity.",
      essential_belief: "Messy, hands-on discovery sticks in your brain way longer than a boring, polished lecture.",
      magic_elixir: "I want to bring this 'Saturday-engineering' mindset to college research labs, treating failed experiments as data points instead of dead ends.",
      ordinary_world: "I was expecting a normal day teaching water sports to forty elementary kids, debating if I even needed sunscreen since it was overcast.",
      special_world: "Scavenging the camp kitchen for honey, dish soap, and a potato. I tried to turn the muddy lake into a science lab using acorns and whiteboards.",
      inciting_incident: "I found a sticky note on the STEM classroom door from the manager: 'Teacher quit. Just keep them alive!'",
      hesitation_doubt: "I panicked. How was I supposed to stretch minute-long attention spans for a whole hour? I felt totally unqualified, especially when a kid proudly declared he was exempt from the laws of physics.",
      crossing_threshold: "I refused to settle for just babysitting. I wiped the board clean and decided to give them the kind of chaotic, hands-on science I loved as a kid.",
      stakes_risk: "If I couldn't figure this out, I was going to lose total control of the kids and look like a clueless teenager who couldn't handle responsibility.",
      the_ordeal: "Trying to force a structured lesson plan while actively wrangling a wobbly fleet of kayaks and dealing with screaming, distracted ten-year-olds.",
      the_catalyst: "I remembered how my dad used to give me 'Saturday engineering challenges.' He never lectured me; he just gave me puzzles. I realized kids just want to figure things out for themselves.",
      winning_action: "I threw out the worksheets. I made a sticker-based game and tailored the science questions to things the kids were actually looking at, like the marsh mud and the clouds.",
      the_payoff: "The campers actually started asking unprompted questions, and by the last day, they were explaining the science of UV radiation to each other."
    }
  },
  {
    id: "diy_pole_vaulter",
    name: "DIY Pole Vaulter (Example Essay)",
    category: "Academic",
    beats: {
      story_selection: "Building a backyard vaulting rig",
      transformation_formula: "I used to base my confidence entirely on winning medals and hearing cheers, but after failing miserably at state, I learned to find my worth in the quiet discipline of daily practice.",
      essential_belief: "Real confidence is built in the quiet darkness of your backyard, not under the stadium lights.",
      magic_elixir: "I use this mindset to mentor younger athletes who struggle with anxiety, and I'll bring this focus on the 'process' rather than the 'prize' to college athletics.",
      ordinary_world: "I cleared 9 feet as a freshman. I believed everyone who said I was naturally talented and would easily break the school record.",
      special_world: "Digging holes and pouring bags of heavy concrete with my dad in the middle of the night. Doing the exact same rope and ring drills over and over in my yard.",
      inciting_incident: "I failed to clear the absolute lowest height at my first sophomore meet. I 'no-heighted' in front of a massive crowd.",
      hesitation_doubt: "I felt like a total fraud and an embarrassment to my team. I kept stepping up to the runway dreading the jump, terrified I was going to fail again.",
      crossing_threshold: "I realized I had to stop defining myself by the scoreboard. I dragged 20-foot steel I-beams from a salvage yard to build my own practice setup at home.",
      stakes_risk: "If I quit now, I'd prove my worst fears right—that I was only a 'good' athlete when things came easy to me.",
      the_ordeal: "Facing a career-defining leap at the junior state tournament. The weather was freezing, the pressure was huge, and a whole row of people were staring me down.",
      the_catalyst: "I remembered the quiet, solitary sound of my backyard steel rig. I realized the only audience I actually needed to impress was myself.",
      winning_action: "I tuned out the crowd, imagined I was back in my quiet yard, and just focused on my personal discipline and technique.",
      the_payoff: "I cleared 10 feet, broke my personal record, and finally qualified for state."
    }
  },
  {
    id: "garage_mechanic",
    name: "The Torque Wrench Key (Example Essay)",
    category: "Academic",
    beats: {
      story_selection: "Fixing a van to give away",
      transformation_formula: "I used to think huge problems like poverty were impossible for a teenager to fix, but after helping rebuild a van for one family, I realized that small, hands-on work changes everything for that one family.",
      essential_belief: "You don't have to fix the whole world to completely change someone's life.",
      magic_elixir: "I'll bring this hands-on, community-focused energy to campus service programs, ready to do the unglamorous work instead of just sitting in committee meetings.",
      ordinary_world: "I grew up comfortable in a small town, totally unaware of the struggles happening just a few streets over.",
      special_world: "Learning how to balance heavy tires and use power tools from scratch. Freezing in a winter garage, dealing with exhaust fumes and permanently greasy hands.",
      inciting_incident: "Finding out that over 700 local families were homeless, and hearing about a mother who passed away just because she couldn't afford a ride to get her asthma inhaler.",
      hesitation_doubt: "I felt completely useless. What was a high schooler supposed to do about systemic poverty? It felt easier to just stay in my comfortable bubble.",
      crossing_threshold: "I signed up for a program that restores vehicles for families in need. Instead of joining a planning committee, I asked to get my hands dirty in the actual garage.",
      stakes_risk: "I was exhausted and in over my head, but I was terrified of asking for help because I didn't want the real mechanics to think I was just a clueless kid.",
      the_ordeal: "Trying to finish a customized van on a super tight holiday deadline. A tire bead tore, the machine jammed, and my hands were raw and covered in grease.",
      the_catalyst: "I remembered a counselor telling me once that 'pride is a luxury when people are waiting on you.' I realized asking for help isn't weakness; it means you actually care about getting it right.",
      winning_action: "Instead of stubbornly trying to force it myself, I stepped back, swallowed my pride, and asked the shop manager for help. We fixed it together.",
      the_payoff: "Handing the keys directly to the family and watching their faces as they realized they finally had a safe way to get around."
    }
  },
  {
    id: "harry_potter",
    name: "Harry Potter",
    category: "Harry Potter",
    beats: {
      story_selection: "The Sorcerer's Stone",
      transformation_formula: "I used to be a lonely kid who thought I didn't belong anywhere, but after finding my friends and facing Voldemort, I realized my choices matter way more than where I come from.",
      essential_belief: "Real courage and true friendship are vastly more powerful than being a 'talented' bully.",
      magic_elixir: "I return to my awful relatives for the summer knowing exactly who I am, and ready to defend my chosen family at school.",
      ordinary_world: "I was sleeping in a literal dusty cupboard under the stairs. I was treated like an annoying burden by the only family I had.",
      special_world: "Failing at basic potions, learning how to fly a broomstick, fighting a giant mountain troll in the bathroom, and finally making real friends.",
      inciting_incident: "A giant man breaks down a door on my 11th birthday and says, 'Yer a wizard, Harry.'",
      hesitation_doubt: "I thought there had to be a giant mistake. I literally stuttered, 'I can’t be a wizard. I’m just Harry!'",
      crossing_threshold: "I made the choice to leave my terrible aunt and uncle, buy a wand, and run full-speed into a solid brick wall to catch the train to Hogwarts.",
      stakes_risk: "If I failed, a dark wizard would return to power, and I'd lose the only home and friends I'd ever had.",
      the_ordeal: "Dropping down a trapdoor, getting past a giant three-headed dog, and having to face Voldemort completely alone in an underground chamber.",
      the_catalyst: "I remembered the rule of the magic mirror: the stone can only be found by someone who wants to protect it, but not use it.",
      winning_action: "I lie to Voldemort's face about what I see in the mirror, choosing to keep the stone safe in my pocket instead of using its power.",
      the_payoff: "I keep the stone out of Voldemort's hands, saving the school and winning the House Cup for Gryffindor."
    }
  },
  {
    id: "neville_longbottom",
    name: "Neville Longbottom",
    category: "Harry Potter",
    beats: {
      story_selection: "The True Gryffindor",
      transformation_formula: "I used to be terrified of failing my parents' brave legacy, but when the school was attacked, I learned that true courage just means standing your ground when you're terrified.",
      essential_belief: "Courage isn't the absence of fear; it's doing the right thing even when your knees are shaking.",
      magic_elixir: "I use my new confidence to become a leader at school and eventually return as a professor to help other insecure kids.",
      ordinary_world: "I was raised by a super strict grandmother who thought I was a disappointment. I was clumsy, forgetful, and the butt of everyone's jokes.",
      special_world: "I eventually discovered real strength at Herbology, joined Dumbledore's Army and slowly learned how to defend myself and stand up for right when other leaders were away from Hogwarts.",
      inciting_incident: "The Sorting Hat put me in Gryffindor (the house of the brave), which just made me feel worse because I didn't feel brave at all.",
      hesitation_doubt: "I felt like a total mistake. I got bullied by teachers, I cried easily, and I secretly wished I had been put in a different house so people wouldn't expect so much from me.",
      crossing_threshold: "I physically blocked my only friends from sneaking out of the dorm at night because I was tired of our house losing points. I stood up to them, even though they easily stunned me.",
      stakes_risk: "If I gave up, the dark wizards would win forever, and all the friends who believed in me would die.",
      the_ordeal: "Standing completely alone as Voldemort's army marched into the school holding Harry's body. Voldemort laughed at me and told me to join him.",
      the_catalyst: "I realized the Sorting Hat didn't make a mistake. Even though Harry was gone, the fight wasn't over. I decided I am a Gryffindor.",
      winning_action: "I broke free from a body-binding curse, pulled the sword of Gryffindor from the burning sorting hat, and destroyed Nagini, Voldemort's last horcrux.",
      the_payoff: "I destroyed the final piece of Voldemort's soul, leaving him finally vulnerable to defeat."
    }
  },
  {
    id: "frodo_baggins",
    name: "Frodo Baggins",
    category: "The Lord of the Rings",
    beats: {
      story_selection: "Carrying the ring to Mt. Doom",
      transformation_formula: "I used to just want to stay in my comfortable bubble and ignore the outside world, but after carrying the Ring, I learned that sometimes you have to sacrifice your own peace to protect the people you love.",
      essential_belief: "Showing mercy to others can save the world even when your own willpower completely collapses.",
      magic_elixir: "I use my hard-earned wisdom to write the history of my people before retiring to a place of healing.",
      ordinary_world: "I lived a peaceful, cozy life in the Shire, reading books, drinking tea, and completely ignoring the dark politics of the outside world.",
      special_world: "Fleeing terrifying monsters in the woods, getting stabbed at an old watchtower, and learning to trust my gardener completely when our fellowship broke apart.",
      inciting_incident: "A wizard threw my uncle's old magic ring into the fireplace, revealing glowing letters that proved it was a weapon of ultimate evil.",
      hesitation_doubt: "I panicked and tried to force the wizard to take it instead. I felt way too small and weak to handle something so dangerous.",
      crossing_threshold: "In a room full of arguing warriors and kings, I stepped forward and volunteered: 'I will take the Ring, though I do not know the way.'",
      stakes_risk: "If I failed, the dark lord would cover the entire world in darkness and burn my peaceful hometown to the ground.",
      the_ordeal: "Standing at the edge of the volcano. I was completely exhausted, and the evil magic of the ring was finally breaking my mind.",
      the_catalyst: "Subverted: I actually couldn't find the internal strength. My willpower completely broke under the pressure. But because I had shown mercy to Gollum earlier, he was there.",
      winning_action: "I failed and claimed the weapon for myself. But in the struggle with Gollum, he bit off my finger and fell into the lava, destroying the ring for good.",
      the_payoff: "The weapon melted, the dark lord's tower collapsed instantly, and the world was saved."
    }
  },
  {
    id: "samwise_gamgee",
    name: "Samwise Gamgee",
    category: "The Lord of the Rings",
    beats: {
      story_selection: "Helping my best friend destroy the One Ring",
      transformation_formula: "I was a simple gardener terrified of stepping outside my hometown, but I learned that ordinary loyalty and friendship can outlast the darkest evil.",
      essential_belief: "Ordinary, stubborn devotion to your friends is the most powerful force in the world.",
      magic_elixir: "I return home as a confident leader, rebuilding our town's gardens and eventually becoming the Mayor.",
      ordinary_world: "I worked as a humble gardener in the Shire. I loved trimming hedges, gossiping at the pub, and feeling safe.",
      special_world: "Cooking stews on the trail, seeing real Elves in the woods. Learning wilderness navigation, fighting off orc scouts, and keeping hope alive when things got bleak.",
      inciting_incident: "I got caught eavesdropping outside Frodo's window. Gandalf dragged me inside by my ear and ordered me to travel with Mr. Frodo.",
      hesitation_doubt: "I was terrified of everything—elves, monsters, heights. I literally stopped at the edge of a cornfield because taking one more step meant it was the furthest I'd ever been from home.",
      crossing_threshold: "I refused to go home when the rest of our group broke apart. I ran into a drowning river just to prove I wouldn't abandon Frodo.",
      stakes_risk: "If I gave up or turned back, Frodo would die alone in a wasteland, and the entire quest would fail.",
      the_ordeal: "I had to fight a giant venomous spider all by myself. I thought Mr. Frodo was dead, and I assumed I had to carry the ring the rest of the way alone.",
      the_catalyst: "I remembered my promise to the Gandalf ('Don't you leave him') and realized my love for Frodo was stronger than my fear.",
      winning_action: "When he collapsed on the volcano, I told Frodo, 'I can't carry it for you, but I can carry you!' I put him on my shoulders and climbed the rest of the way.",
      the_payoff: "I got him to the door of the volcano, allowing him to complete the final steps of the mission."
    }
  },
  {
    id: "aragorn",
    name: "Aragorn",
    category: "The Lord of the Rings",
    beats: {
      story_selection: "Accepting the crown",
      transformation_formula: "I used to hide in the shadows because I was paralyzed by the fear of repeating my ancestors' mistakes. After leading the armies, I accepted that we aren't doomed to repeat the past.",
      essential_belief: "We are NOT bound by our ancestors' failures; we have the power to forge our own honorable path.",
      magic_elixir: "I accept the high crown, providing the steady leadership needed to heal a broken world.",
      ordinary_world: "I was a nearly anonymous ranger roaming in the wilderness, keeping my heritage secret. I actively rejected my right to rule because I was terrified of being corrupted by power.",
      special_world: "Relentlessly tracking captured friends across the plains, defending a fortress against impossible odds, and learning how to command fractured, proud people.",
      inciting_incident: "I met four hobbits at the Prancing Pony, a dirty tavern in Bree, and had to step out of the shadows to protect them from pursuing assassins.",
      hesitation_doubt: "I constantly resisted the urging of my mentors to claim my throne. I wanted to just be a bodyguard because I feared I would morally fail.",
      crossing_threshold: "I took active command of our group after Gandalf fell in the mines. I pledged my life to guide the ringbearer, Frodo.",
      stakes_risk: "If I refused to step up as King, the armies of Men would remain divided and the enemy would crush them one by one.",
      the_ordeal: "Looking at the overwhelming, terrifying armies of Mordor. I had to decide right then whether to keep hiding my identity or accept the massive target on my back.",
      the_catalyst: "Lord Elrond brought me Isildur's shattered sword, fully reforged. It reminded me that broken things can be fixed, and I am my own person.",
      winning_action: "I led a desperate, suicidal distraction at the Black Gate. I rallied my terrified soldiers and charged the enemy first, acting fully as the King.",
      the_payoff: "I bought just enough time and distracted the enemy long enough for Frodo to destroy the Ring."
    }
  },
  {
    id: "bilbo_baggins",
    name: "Bilbo Baggins",
    category: "The Hobbit",
    beats: {
      story_selection: "To the Lonely Mountain and back",
      transformation_formula: "I used to avoid risk and discomfort at all costs, but after going on a wild quest and facing a dragon, I found out I actually have a lot of courage and sharp wits.",
      essential_belief: "Courage and a sharp mind can bridge deep divides and solve problems that brute force cannot.",
      magic_elixir: "I returned to my boring hometown with a totally broadened perspective, writing memoirs to teach other hobbits about the exciting wider world.",
      ordinary_world: "I liked to sit on my front porch, enjoying my pipe. I loved pre-planned warm meals, total safety, and zero surprises.",
      special_world: "Getting captured by stone trolls, getting lost in massive Goblin tunnels, and playing a high-stakes riddle game with Gollum in a dark cave.",
      inciting_incident: "Gandalf secretly marked my door. That night thirteen loud, rude dwarves showed up uninvited and asked me to help them steal gold from a literal dragon.",
      hesitation_doubt: "I trembled, flatly refused to go, screamed at the mention of dragon fire, and literally fainted on my living room rug.",
      crossing_threshold: "I woke up late, looked at my empty house, and realized my safe life was incredibly boring. I ran out the door without a coat or hat to catch up to the dwarves.",
      stakes_risk: "If I failed, my new friends would be incinerated, and I would be burned alive deep inside a mountain.",
      the_ordeal: "Creeping down a dark rock chute completely alone. Standing on a mountain of gold and looking a giant dragon directly in the eyes.",
      the_catalyst: "I realized that being small and insignificant was actually my greatest weapon: I could sneak around unnoticed, giving me unique leverage.",
      winning_action: "I stole the legendary Arkenstone and snuck out of camp in the middle of the night. I used it to force the stubborn kings into a peaceful negotiation.",
      the_payoff: "I prevented an all-out war between five armies and managed to keep my friendship with the dwarf king Thorin."
    }
  },
  {
    id: "ian_lightfoot",
    name: "Ian Lightfoot",
    category: "Onward",
    beats: {
      story_selection: "The Final Goodbye",
      transformation_formula: "I used to be super anxious and thought I lacked any 'inner spark', but after this crazy quest, I realized I was capable all along and that my older brother was the real father figure I needed.",
      essential_belief: "The support and guidance we desperately seek is often already right beside us, even if it looks different than we imagined.",
      magic_elixir: "I use my newfound confidence to bring magic back to my community and finally build a real relationship with my brother.",
      ordinary_world: "Living in a boring suburban town with zero magic. I struggled with awful social anxiety and obsessed over the dad I never got to meet.",
      special_world: "Running away from angry pixie biker gangs. Trying to cast a spell to create an invisible bridge over a bottomless canyon, and learning to drive on the highway under pressure.",
      inciting_incident: "My mom gave me my dad's old wizard staff for my 16th birthday. The spell to bring him back for a day went wrong, and only his legs returned.",
      hesitation_doubt: "I thought I was too weak and clumsy to cast real spells. I was convinced I just didn't have the magical 'inner spark' necessary to pull this off.",
      crossing_threshold: "I grabbed the keys to my brother's sketchy van and stepped on the gas, launching us on a 24-hour road trip to find a magic gem.",
      stakes_risk: "If I failed, the sun would set, the spell would permanently break, and we would lose our one and only chance to ever talk to our dad.",
      the_ordeal: "Realizing our map just led us in a circle back to our own high school. Suddenly, a giant dragon made of school rubble attacked us.",
      the_catalyst: "I looked at my lifelong 'Dad Checklist' and realized my annoying older brother was actually the one who taught me to drive, supported me, and fulfilled every fatherly requirement on my checklist.",
      winning_action: "Subverted: I stepped aside. I told my brother to go talk to our dad, while I used my new magic skills to fight the dragon single-handedly so they had time.",
      the_payoff: "I defeated the dragon, saved my brother's life, and realized I already had the family and guidance I was searching for."
    }
  },
  {
    id: "peter_parker",
    name: "Peter Parker",
    category: "Spider-Man",
    beats: {
      story_selection: "Becoming Spider-Man",
      transformation_formula: "I was an awkward high schooler who wanted to use my newly acquired powers to look cool and make a quick buck. After my selfishness cost my uncle his life, I realized I had to step up and help people.",
      essential_belief: "With great power comes great responsibility. You can't look the other way when you have the ability to help.",
      magic_elixir: "I accept the heavy burden of keeping my city safe, even if it means sacrificing my own normal life and keeping my identity a secret.",
      ordinary_world: "I was an awkward outsider who got bullied at school. Just trying to survive high school while living under my Aunt and Uncle's strict curfews.",
      special_world: "Testing my web-shooters on rooftops and taking painful falls into dumpsters. Trying to balance my AP homework with stopping random muggings.",
      inciting_incident: "I was bitten by a genetically-modified spider on a field trip. I woke up with extreme physical reflexes and realized I could stick to the ceiling.",
      hesitation_doubt: "I didn't want the responsibility. I just used my powers to win easy wrestling cash and literally let an armed thief run right past me because 'it wasn't my problem.'",
      crossing_threshold: "Finding my Uncle Ben shot dead on the sidewalk by the same thief I let run by. I realized my selfish choices have permanent, real-world consequences.",
      stakes_risk: "If I refused to fight the Green Goblin, both Mary Jane and a tram full of innocent kids were going to drop to their deaths in the river.",
      the_ordeal: "The Green Goblin held Mary Jane in one hand and a tram full of kids in the other over the river, forcing me to choose who lives and who dies.",
      the_catalyst: "I remembered Uncle Ben's dying wisdom: 'With great power comes great responsibility.' I realized I didn't have to play the Green Goblin's sick game.",
      winning_action: "I refused the villain’s choice entirely. I dove off the bridge, grabbed both web lines with bleeding hands, and pulled everyone to safety.",
      the_payoff: "I rescued all the innocent people and defeated the Green Goblin in hand-to-hand combat."
    }
  },
  {
    id: "elle_woods",
    name: "Elle Woods",
    category: "Legally Blonde",
    beats: {
      story_selection: "The Legally Blonde Lawyer",
      transformation_formula: "I used to care mainly about fitting a certain mold and relied on my boyfriend's validation. After toughing it out and then crushing it at Harvard Law, I realized I don't need to hide my fun, bubbly personality to be brilliant.",
      essential_belief: "You don't need to dilute your personality, hide your femininity, or fit a boring mold to be taken seriously.",
      magic_elixir: "I use my top-notch legal skills to fiercely defend other people that society underestimates.",
      ordinary_world: "I was living a perfect, pink-themed life as a sorority president. I had majoring in fashion merchandising and was just waiting for my boyfriend to propose.",
      special_world: "I was humiliated in my first Harvard seminar and kicked out of class for being unprepared. I spent weekends intensely memorizing boring courtroom precedents while everyone else partied.",
      inciting_incident: "My boyfriend Warner dumped me at dinner. He said I was 'too blonde' and not serious enough for his future political career.",
      hesitation_doubt: "I spent days crying and eating chocolates on the couch, totally convinced I had to change myself to fit his narrow idea of 'serious.'",
      crossing_threshold: "I studied like crazy for the LSAT, scored a 179, and got into Harvard. I showed up on the stuffy, dark-wood campus wearing a bright-pink leather suit.",
      stakes_risk: "If I failed the courtroom trial, I'd prove Warner right—that I was just a 'dumb blonde' incapable of real intellectual thought.",
      the_ordeal: "My respected law professor made inappropriate advances on me in his office, completely shattering my belief that he'd hired me for my brain.",
      the_catalyst: "I realized my deep, encyclopedic knowledge of cosmetology and perm maintenance was actually a highly specific, totally valid analytical skill.",
      winning_action: "I refused to quit. I put on a bright-pink litigation dress, took over the defense, and trapped the lying witness on the stand using the chemical rules of ammonium thioglycolate.",
      the_payoff: "The witness accidentally confessed to the murder on the stand, and my client was immediately cleared of all charges."
    }
  },
  {
    id: "scout_finch",
    name: "Scout Finch",
    category: "To Kill a Mockingbird",
    beats: {
      story_selection: "The Maycomb Trial",
      transformation_formula: "I was a naive kid who saw the world in black and white and believed all the spooky neighborhood rumors about Boo Radley, but after watching Tom Robinson's trial, I learned how to truly step into someone else's shoes.",
      essential_belief: "You never really understand a person until you consider things from their point of view—until you climb into their skin and walk around in it.",
      magic_elixir: "I use my new understanding of human empathy to protect my neighbor's privacy and guide my own moral compass as I grow up.",
      ordinary_world: "I spent my days playing games in a safe, quiet neighborhood sandbox, believing local spooky stories and terrified of Boo Radley, the mysterious man who lived down the street.",
      special_world: "I sat through hot, exhausting hours in the courthouse, watching adults openly lie under oath. I had to fight kids at school who insult my family because of my dad defending Tom.",
      inciting_incident: "My dad, Atticus, took on the controversial defense of an innocent Black man. The whole town flared up with racist anger and tension.",
      hesitation_doubt: "I was totally confused at why the town was mocking my dad. I secretly wished he was just a normal, quiet office worker who didn't stir up so much trouble.",
      crossing_threshold: "Subverted: Instead of going on an adventure, my commitment was to stay and watch. I snuck up into the hot courthouse balcony to witness the ugly, raw truth of the trial.",
      stakes_risk: "If our reclusive neighbor hadn't intervened, my brother and I would have been murdered in the dark woods by a vengeful man trying to save his pride.",
      the_ordeal: "Jem and I were attacked in the pitch-black woods by Bob Ewell. I was trapped inside a heavy, clumsy ham costume, and my brother's arm got broken in the struggle.",
      the_catalyst: "I remember my dad's advice that you never really understand a person until you 'climb into his skin and walk around in it.'",
      winning_action: "When Boo Radley emerged to save us, I din't run away. I walked him home, stood on his front porch, and actively shifted my perspective to see the whole town from his lonely angle.",
      the_payoff: "I safely diffused my own childhood fears and walked my mysterious neighbor home in total peace."
    }
  },
  {
    id: "hiro_hamada",
    name: "Hiro Hamada",
    category: "Big Hero 6",
    beats: {
      story_selection: "The Healing Robot",
      transformation_formula: "I was to be a grieving kid who wanted to use my tech skills to get revenge on my brother's killer, but after understanding what my brother really built, I realized it's better to use my genius to heal people.",
      essential_belief: "True heroism comes from healing and protecting people, not from executing vengeance.",
      magic_elixir: "I dedicate my engineering genius to defending the city with my friends, keeping my brother's selfless spirit alive.",
      ordinary_world: "I was a 14-year-old coding prodigy with no direction. I was waste my brain hustling adults in illegal, underground robot street fights.",
      special_world: "I built custom power-armor for a group of nerdy college students. Dealt with incredibly painful trial-and-error as I tried to teach a medical robot how to fly.",
      inciting_incident: "My amazing older brother was killed in a suspicious fire. All I have left of him is Baymax, a squishy, gentle healthcare robot he invented.",
      hesitation_doubt: "I sank into a hollow depression and locked myself in my room. I refused to enroll in college and ignored all my brother's friends.",
      crossing_threshold: "Baymax accidentally activated and spotted a clue about the fire. I strapped armor onto him and stepped out of my bedroom to hunt down the villain.",
      stakes_risk: "If I let my anger consume me, I would destroy my brother's legacy and become just as toxic as the man who caused the fire.",
      the_ordeal: "Trapped deep inside a collapsing, unstable portal dimension. I had to choose between letting the villain's daughter die, or sacrificing my only remaining link to my brother.",
      the_catalyst: "I watched old video logs of my brother failing dozens of times to build Baymax. I realized Baymax was designed to be a caregiver, not a weapon of revenge.",
      winning_action: "Faced with a ruined thruster, I knew Baymax had to stay behind so I could save the girl. I tearfully let go of my best friend, declaring, 'I am satisfied with my care.'",
      the_payoff: "Baymax fired his rocket-fist, safely blasting our pod out of the dimension right before it collapsed."
    }
  },
  {
    id: "carl_fredricksen",
    name: "Carl Fredricksen",
    category: "Up",
    beats: {
      story_selection: "Helping Russel save Kevin",
      transformation_formula: "I was to be a grumpy guy stubbornly clinging to the past and refusing to change, but after this crazy journey, I realized that true adventure is about the relationships you build right now.",
      essential_belief: "True adventure isn't a location on a map or a completed bucket list; it is the mundane, beautiful relationships we build along the way.",
      magic_elixir: "I returned to society and fully re-engaged with the world, showing up to be the proud, supportive grandfather figure that Russell needs.",
      ordinary_world: "I was living alone in my outdated house, surrounded by construction. I clung stubbornly to my rigid daily routine and all my dead wife's old things.",
      special_world: "I had to steer my flying house through a massive thunderstorm. Discovered a very loud kid accidentally stowed away on my porch. Dragged that heavy, hovering house across South America by a garden hose.",
      inciting_incident: "A construction worker damaged my mailbox, and I snapped and hit him with my cane. A judge forced me to move into a retirement home.",
      hesitation_doubt: "I sat in my darkened living room, looking at my wife's adventure book. I felt totally defeated, convinced I permanently failed my lifelong promise to take her to Paradise Falls.",
      crossing_threshold: "Instead of getting in the retirement home van, I released thousands of helium balloons from my chimney, turning my house into an airship and flying away.",
      stakes_risk: "If I didn't empty my house, I would save all my precious reminders of Ellie, but I would let my new friends be captured or killed by a madman.",
      the_ordeal: "My childhood hero captured my friends and set my house on fire. I was forced to choose between saving the house or saving the people who needed me.",
      the_catalyst: "Sitting alone, I finally opened the blank pages of my wife's adventure book. I discovered she actually filled them with photos of our boring, everyday life together—that was her real adventure.",
      winning_action: "I tossed my cherished, heavy antique furniture out the door to make the house light enough to fly agin. I left the physical reminders of my past behind to rescue Russell and Kevin.",
      the_payoff: "I defeated the villain, saved my friends, and watched my beloved house peacefully drift away into the clouds without feeling sad about it."
    }
  },
  {
    id: "luke_skywalker",
    name: "Luke Skywalker",
    category: "Destroying the Death Star",
    beats: {
      story_selection: "The Trench Run",
      transformation_formula: "I used to be an impatient farm kid just dreaming of escaping my boring town and chores, but after joining the rebellion, I learned to trust in something bigger than myself instead of just relying on logic and machines.",
      essential_belief: "Inner faith and spiritual trust are vastly superior to relying solely on cold logic and mechanical technology.",
      magic_elixir: "I committed fully to my Jedi training, using my connection to the Force to protect the entire Rebellion.",
      ordinary_world: "I spent may days staring at the twin suns on dusty, desert Tatooine. I was trapped in a boring routine repairing moisture vaporators and listening to my uncle tell me I can't leave.",
      special_world: "I found myself sneaking around a space station, rescuing a princess, and coping with Obi-Wan's sudden, shocking death. I had to swallow my farm-boy ego to fly with experienced military pilots.",
      inciting_incident: "I bought two used droids, and one projected a hidden distress message from a princess. It led me to the old hermit Ben Kenobi who reveals my dad was a legendary Jedi.",
      hesitation_doubt: "At first I completely rejected the call to adventure. I told Obi-Wan, 'I can't get involved. I've got work to do. My uncle needs me.'",
      crossing_threshold: "I returned home to find my aunt and uncle murdered by Imperial troops. I realized my ties to my old life were gone forever, saying: 'There's nothing for me here now.'",
      stakes_risk: "If my torpedo misses the exhaust port, the Death Star will fire, annihilating the Rebel base and ending the war instantly.",
      the_ordeal: "I piloted an X-wing down a narrow metal trench while dodging heavy laser fire. Darth Vader had locked onto my ship, and my mechanical targeting computer wasn't working.",
      the_catalyst: "I herd Obi-Wan's ghostly voice in my head telling me: 'Luke, trust your feelings.'",
      winning_action: "I manually switched off my ship's targeting computer, closed my eyes, and relied purely on my instincts and the Force to take the shot.",
      the_payoff: "I fired a perfect torpedo that blows up the entire Death Star, and I survive and received a medal."
    }
  },
  {
    id: "rey_skywalker",
    name: "Rey Skywalker",
    category: "Star Wars",
    beats: {
      story_selection: "The Scavenger's Choice",
      transformation_formula: "I lived the life of a lonely scavenger on Jakku; my whole identity was defined by waiting for my parents to come back, but after this journey, I learned that I can choose my own destiny and my own family.",
      essential_belief: "Our bloodline and our past do not dictate our future; we have the absolute power to choose our own family and legacy.",
      magic_elixir: "I rejected my evil grandfather's name, adopting the Skywalker name to preserve the legacy of the Jedi and protect the galaxy.",
      ordinary_world: "I spent my days scraping rust and salvaging remnants off crashed ships in a desert wasteland. Counting out food portions, completely isolated, and desperately waiting for a family that was never coming back.",
      special_world: "I was stranded on a snowy enemy base with a lightsaber I barely know how to use. I was having terrifying visions, learned to pilot the Millenium Falcon, and survived a dark-side mirror cave.",
      inciting_incident: "I rescued a little rolling droid in the desert. Then I ran into a rogue stormtrooper, and we were forced to steal a dusty old ship to escape an airstrike.",
      hesitation_doubt: "When I touched an old lightsaber, I get a terrifying psychic vision. I panicked, refused to take the sword, and literally ran away into the dark woods because I was so scared.",
      crossing_threshold: "When I was captured and strapped to a chair, I realized I have Force powers. I actively used a mind-trick to escape my cell and committed to the fight.",
      stakes_risk: "If I surrendered to my grandfather, I'd become the Empress of the Sith, but I'd have to watch all my friends in the Resistance be wiped out.",
      the_ordeal: "Confronting the Emperor on a dark, stormy planet. I was totally depleted of physical strength, surrounded by dark shadows, and he demanded I accept my evil bloodline.",
      the_catalyst: "I closed my eyes and reach out to the past, hearing the whispered voices of all the Jedi who came before me telling me to 'Be with me.'",
      winning_action: "I crossed two lightsabers to deflect the Emperor's massive lightning strike, declaring 'And I... am all the Jedi.'",
      the_payoff: "The lightning reflected back, vaporizing the Emperor, totally destroying the Sith forces once and for all."
    }
  },
  {
    id: "napoleon_dynamite",
    name: "Napoleon Dynamite",
    category: "Napoleon Dynamite",
    beats: {
      story_selection: "Pedro's election",
      transformation_formula: "I used to be a super-awkward outcast who just made up stories to sound cool, but after risking total humiliation to help my friend win the student body election, I became a lot more secure in my own weirdness.",
      essential_belief: "Embracing your authentic, eccentric self is way more powerful than trying to conform to a polished, popular expectation.",
      magic_elixir: "I returned to my normal high school life completely secure in my identity, finally playing tetherball with actual friends instead of by myself.",
      ordinary_world: "Living as a highly unpopular high school outcast in rural Idaho. I spend my time drawing ligers, making up stories about hunting wolverines, and eating tater tots alone.",
      special_world: "Attempting to hand out homemade campaign flyers, getting shoved into lockers by jocks, and awkwardly learning sign language to sing with the Happy Hands Club.",
      inciting_incident: "A quiet, new kid named Pedro transfers to our school. I'm assigned to show him around, and he randomly decides to run for class president.",
      hesitation_doubt: "I have literally zero social capital. I know we lack the money, the looks, and the popularity required to run a real high school campaign.",
      crossing_threshold: "I pledge my loyalty to Pedro in spite of bullying and teasing from Summer's friends. I put on a 'Vote for Pedro' t-shirt and boldly started campaigning for him.",
      stakes_risk: "If I didn't get on that stage, Pedro would face total public humiliation and lose the election to the mean, popular clique.",
      the_ordeal: "The final election assembly. Pedro gave a really depressing speech to a totally silent crowd. Then the principal announced that each candidate had to present a skit, and we had nothing prepared.",
      the_catalyst: "I my Jamiroquai 'Canned Heat' tape I’d been practicing alone in my room and realized it was the only tool I had to save my friend.",
      winning_action: "I handed my cassette tape to the sound guy, walked onto the stage completely alone, and performed a fiercely uninhibited, perfectly executed dance routine in front of the whole school.",
      the_payoff: "The entire school erupted in a massive standing ovation, and Pedro won the election."
    }
  },
  {
    id: "aladdin",
    name: "Aladdin",
    category: "Aladdin",
    beats: {
      story_selection: "Becoming a prince and freeing Genie",
      transformation_formula: "I used to be an insecure thief who believed I had to be rich and royal to have any value. After defeating Jafar, I realized my true worth comes from being honest about who I am.",
      essential_belief: "A person's true worth comes from their internal character and selfless choices, not from external riches or a fancy title.",
      magic_elixir: "I used my final magical wish to grant Genie his freedom instead of helping myself, proving my character and earning the right to marry the princess.",
      ordinary_world: "I was living as a homeless 'street rat', stealing bread just to survive, dodging royal guards, and wishing people saw me as more than a worthless thief.",
      special_world: "In the Cave of Wonders I found a magic lamp and transformed into 'Prince Ali.' I learned about navigating the fancy royal court while constantly lying to cover up my past, and battling massive impostor syndrome.",
      inciting_incident: "I rescued a disguised girl in the marketplace and we actually connect. I only found out she was the princess when the guards suddenly arrest me.",
      hesitation_doubt: "Trapped in the palace dungeon, I felt entirely inadequate. I was convinced my poverty made me fundamentally unworthy of ever talking to the princess again.",
      crossing_threshold: "I agree to enter the terrifying Cave of Wonders to fetch a lamp for a creepy old man, knowing it's my only ticket out.",
      stakes_risk: "If I fail to trick Jafar, he will keep ultimate cosmic power, enslave the girl I love, and rule the city as a tyrant.",
      the_ordeal: "Jafar steals my lamp, exposes me as a fraud to the entire kingdom, strips away my fancy prince clothes, and banishes me to a frozen wasteland to die.",
      the_catalyst: "Stripped of my magic, I realize my fake wealth was useless, but my quick-witted street smarts are real. I realize Jafar's massive ego is his biggest vulnerability.",
      winning_action: "I return to face the all-powerful sorcerer using only my wits. I goad him by calling him 'second best', tricking him into wishing to become a genie himself.",
      the_payoff: "Jafar is instantly sucked into his own lamp, trapped by the cosmic rules of being a genie, and the city is saved."
    }
  },
  {
    id: "rudy",
    name: "Rudy Ruettiger",
    category: "Rudy",
    beats: {
      story_selection: "Determined to play for the Irish",
      transformation_formula: "I used to let everyone tell me I was too small and not smart enough to succeed, but after years of brutal practice, I proved to myself that relentless grit can overcome almost any physical limit.",
      essential_belief: "Relentless, gritty perseverance and a crazy work ethic can overcome almost any physical or academic limitation.",
      magic_elixir: "I finally earned my college degree, gained my family's respect, and proved that true failure only happens when you quit on yourself.",
      ordinary_world: "I lived in a working-class steel mill town. I was short, got terrible grades, and everyone expected me to abandon my crazy dream of playing college football and go to work in the mill like everyone else.",
      special_world: "I battled severe dyslexia with a tutor just to pass classes. I took a grueling job scrubbing the stadium. I endured brutal, daily physical beatings as a human tackling dummy on the practice squad.",
      inciting_incident: "My best friend—the only person who actually supported my dream—was killed in an explosion at the steel mill.",
      hesitation_doubt: "Overwhelmed by grief and the chorus of voices telling me I was too small and dumb, I started to believe my dream really was just a foolish delusion.",
      crossing_threshold: "I refused to settle for a life of regret. I packed a bag, left my hometown, and boarded a bus to South Bend with barely any money, and enrolled in a nearby junior college.",
      stakes_risk: "If I quit the team right before the final game, I would validate everyone who ever doubted me and I'd have to live with the regret forever.",
      the_ordeal: "It was the final home game of my senior year. The new head coach refused to put me on the dress list, breaking a promise. Utterly broken, I finally gave up and quit the team.",
      the_catalyst: "The groundskeeper confronted me. He told me about his own agonizing regret of quitting the team years ago, making me realize that true failure isn't missing the roster, it's quitting.",
      winning_action: "I swallowed my pride, apologized, and returned to the practice field. I continued to absorb brutal hits just to prepare the starting defense, prioritizing my work ethic over my ego.",
      the_payoff: "Inspired by my dedication, the star players literally laid their jerseys on the coach's desk, demanding I dress in their place. I got to play one snap and successfully sacked the quarterback."
    }
  }
];