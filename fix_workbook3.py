with open('src/components/Workbook.tsx', 'r') as f:
    content = f.read()

bad = """                    >
                      <Wand2 className="w-4 h-4" />
                      I'm stuck. Ask me a different way.
                    </button>
                  </div>
                )"""

good = """                    >
                      <Wand2 className="w-4 h-4" />
                      I'm stuck. Ask me a different way.
                    </button>
                    </div>
                  </div>
                )"""

content = content.replace(bad, good)
with open('src/components/Workbook.tsx', 'w') as f:
    f.write(content)
