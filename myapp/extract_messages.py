import os
import sys
from babel.messages.frontend import extract_messages
from babel.messages.pofile import write_po

files = sys.argv[1:]
path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
messages = extract_messages(path=path, output_file='messages.pot')
write_po('messages.po', messages)
