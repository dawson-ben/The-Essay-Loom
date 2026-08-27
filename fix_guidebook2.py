with open('src/components/InteractiveGuidebook.tsx', 'r') as f:
    content = f.read()

bad_ending = """                            </div>
                          </div>
                        )

                  </div>"""

good_ending = """                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>"""

content = content.replace(bad_ending, good_ending)

with open('src/components/InteractiveGuidebook.tsx', 'w') as f:
    f.write(content)
