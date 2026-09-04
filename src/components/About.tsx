import React from 'react';

export default function About() {
  return (
    <div className="flex-1 bg-[#070B14] text-slate-300">
      <div className="max-w-3xl mx-auto px-6 py-16 w-full">
        <h1 className="text-4xl font-serif text-white mb-4">The Zero-AI Guarantee</h1>
        <p className="text-xl text-teal-400 mb-12 font-serif italic border-l-4 border-teal-500 pl-4">
          We provide the loom. You weave the narrative.
        </p>

        <div className="prose prose-invert prose-teal max-w-none">
          <h2>Why We Built The Essay Loom</h2>
          <p>
            For decades, the college personal statement has been haunted by the "curse of the blank page." Staring at a blinking cursor, students often feel paralyzed, unsure of how to distill seventeen years of life into 650 words. 
          </p>
          <p>
            Recently, the tech industry's answer to this anxiety has been artificial intelligence. But using an LLM to write your personal statement defeats the entire purpose of the essay: to showcase <strong>your authentic voice</strong>, your distinct character, and your unique lived experiences. We built The Essay Loom to cure the blank page through rigorous, psychological structure—not mindless automation.
          </p>

          <h2>Our Unequivocal Zero-AI Promise</h2>
          <p>
            <strong>The Essay Loom does not generate text.</strong> It does not write your essay for you. It does not use large language models (LLMs) to suggest paragraphs, re-write your sentences, or artificially polish your tone. 
          </p>
          <p>
            We believe that the struggle of writing is where the meaning is forged. Our platform is a dedicated workspace designed to help you organize your thoughts, deconstruct your life experiences into meaningful blocks, and visualize your narrative arc. The voice, the words, and the story remain 100% yours. Admissions officers want to hear from <em>you</em>, not an algorithm.
          </p>

          <h2>The Loom Metaphor</h2>
          <p>
            Think of this platform as a traditional handloom. A loom cannot weave a tapestry by itself; it requires a human artisan to select the threads, determine the pattern, and drive the shuttle. What the loom <em>does</em> provide is the essential tension and structural framework that keeps the threads from tangling.
          </p>
          <p>
            Here, we provide the frame. We offer the narrative tracks, the pacing guides, and the structural blueprints. But you bring the threads—your vulnerabilities, your triumphs, your weird quirks, and your profound realizations. Together, you will weave a personal statement that is undeniably, authentically human.
          </p>
        </div>
      </div>
    </div>
  );
}
