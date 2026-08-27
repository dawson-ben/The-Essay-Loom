with open('src/components/InteractiveGuidebook.tsx', 'r') as f:
    content = f.read()

bad = """                            </div>
                          </div>
                        )


                  </div>"""

good = """                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>"""

content = content.replace(bad, good)

with open('src/components/InteractiveGuidebook.tsx', 'w') as f:
    f.write(content)
