"""TO-DO: Write a description of what this XBlock is."""
import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope,JSONField
from xblock.fragment import Fragment

class ReglasXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    resources_taged = JSONField(
        default=[], scope=Scope.user_state_summary,
        help="Array containing resource tagged information",
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def studio_view(self, context=None):
        """
        The primary view of the ReglasXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/reglasxblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/reglasxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/reglasxblock.js"))
        frag.initialize_js('ReglasXBlock')
        return frag

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the ReglasXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/student_reglasxblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/student_reglasxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/student_reglasxblock.js"))
        frag.initialize_js('StudentReglasXBlock')
        return frag
    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def tag_resource(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        # assert data['hello'] == 'world'
        print(data['tag'])
        print(data['resource'])
        self.resources_taged.append(data)
        # self.style_learn(data[tag])
        print(self.resources_taged)

        # self.count += 1
        return {"tag": data}

    @XBlock.json_handler
    def show_resources(self,data,suffix=''):
        return self.resources_taged

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("ReglasXBlock",
             """<reglasxblock/>
             """),
            ("Multiple ReglasXBlock",
             """<vertical_demo>
                <reglasxblock/>
                <reglasxblock/>
                <reglasxblock/>
                </vertical_demo>
             """),
        ]