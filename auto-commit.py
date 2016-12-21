from os import system as execute
import argparse
import random, string
import urllib2
from HTMLParser import HTMLParser


class AutoCommit:
    def __init__(self):
        pass

    def add_arguments(self, parser):
        parser.add_argument("-a", "--action", # argument names
                            nargs=1, # only one message allowed
                            type=str,
                            dest="action",
                            default=None, # default message for the commit
                            help="The git action to do, either pull or push")
        parser.add_argument("-c", "--commit", # argument names
                            nargs=1, # only one message allowed
                            type=str,
                            dest="commit",
                            default=None, # default message for the commit
                            help="Contain the message for the commit")
        args = parser.parse_args()
        return args

    def set_arguments(self, args):
        options = {}
        for arg in vars(args):
            value = getattr(args, arg)
            if value:
                options[arg] = getattr(args, arg)[0].lower() # since we can only have one value!
            else:
                options[arg] = getattr(args, arg) # value is None
        self.options = options

    def execute_commad(self):
        try:
            actions = ["pull", "push"]
            if self.options["action"] == None:
                raise ValueError('can not be empty', 'action')
            if self.options["action"] not in actions:
                raise ValueError('can only be `push` or `pull`', '--action/ -a')

            if not self.options["commit"] or self.options["commit"] == "auto":
                random_string = ''.join(random.choice(string.lowercase) for i in range(10))
                request = urllib2.Request("http://www.whatthecommit.com/?r=" + random_string)
                response = urllib2.urlopen(request)
                html = response.read()

                html_parser = ResponseParser()
                html_parser.feed(html)
                html_parser.close()
                self.options["commit"] = html_parser.data[0].replace("\n", "")

            print(self.options)
            execute("git add .")
            ccc = "git commit -m '%s'" % (self.options["commit"], )
            execute(ccc)
        except ValueError as e:
            print(e[1] + ": " + e[0])

class ResponseParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.recording = 0
        self.data = []
    def handle_starttag(self, tag, attrs):
        if tag != "p":
            return
        self.recording += 1

    def handle_endtag(self, tag):
        if tag != "p":
            return

    def handle_data(self, data):
        if self.recording != 1:
            return
        self.data.append(data)

if __name__ == '__main__':
    print("Auto git commit will start...")
    parser = argparse.ArgumentParser(description="A lazy solution for doing git commits automatically")

    git = AutoCommit()
    args = git.add_arguments(parser)
    git.set_arguments(args)
    git.execute_commad()
