import re

with open('src/components/AssemblyBoard.tsx', 'r') as f:
    content = f.read()

old_func = """const SortableDraftingBlock = (props: {
  slot: PatternSlot;
  block: EssayBlock | undefined;
  limitType: 'words' | 'characters';
  globalLimitValue: number;
  onDraftChange: (text: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.slot.promptId });"""

new_func = """const SortableDraftingBlock = ({
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
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: slot.promptId });"""

content = content.replace(old_func, new_func)

old_return = """    <div ref={setNodeRef} style={style} className="mb-4">
      <DraftingBlock 
        {...props} 
        dragHandleProps={{...attributes, ...listeners}}
      />
    </div>"""

new_return = """    <div ref={setNodeRef} style={style} className="mb-4">
      <DraftingBlock 
        slot={slot}
        block={block}
        limitType={limitType}
        globalLimitValue={globalLimitValue}
        onDraftChange={onDraftChange}
        dragHandleProps={{...attributes, ...listeners}}
      />
    </div>"""

content = content.replace(old_return, new_return)

with open('src/components/AssemblyBoard.tsx', 'w') as f:
    f.write(content)
