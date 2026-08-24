import re

with open('src/components/AssemblyBoard.tsx', 'r') as f:
    content = f.read()

old_func = """const SortableDraftingBlock = ({
  slot,
  block,
  limitType,
  globalLimitValue,
  onDraftChange
}: {
  slot: PatternSlot;
  block: EssayBlock | undefined;
  limitType: 'words' | 'characters';
  globalLimitValue: number;
  onDraftChange: (text: string) => void;
}) => {"""

new_func = """type SortableProps = {
  slot: PatternSlot;
  block: EssayBlock | undefined;
  limitType: 'words' | 'characters';
  globalLimitValue: number;
  onDraftChange: (text: string) => void;
};

const SortableDraftingBlock: React.FC<SortableProps> = ({
  slot,
  block,
  limitType,
  globalLimitValue,
  onDraftChange
}) => {"""

content = content.replace(old_func, new_func)

with open('src/components/AssemblyBoard.tsx', 'w') as f:
    f.write(content)
