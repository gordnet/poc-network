Pull requests without an explanation and clear improvement or relevance to the project may be closed
immediately.
Please provide clear motivation for your work/patch/enhancement and explain how it improves
the GordNet development work. If the code is related to an issue, please provide the issue number or summary in the code commit.

Any test improvements or new tests that improve coverage are always welcome.
All other changes should have accompanying unit tests (see src/test/) or
functional tests (see test/). Contributors should note which tests cover
modified code. If no tests exist for a region of modified code, new tests
should accompany the change.
Bug fixes are essential to the project. Please ensure that those bugs were recreated to ensure it truly was a bug. 
Please ensure the fix was tested and the steps were recreated to see that the bug is not there. Please provide an 
explanation and summary of the potential issue as well as for the solution.
The GordNet project will have constant feature additions and pull requests.
However, features might be rejected due to design or scope issues or if it is determined that this piece of code does not
fit the project objectives. If a feature is based on a lot of dependencies, contributors should first
consider building the system outside of GordNet, if possible.
Refactoring changes are only accepted if they are required for a feature or
bug fix or otherwise improve developer experience significantly or unless specifically raised as an Issue.

GordNet has a thorough review process and even the most trivial change
needs to pass a lot of design reviews and testing so it is essential the all procedures are followed.

Here is a checklist you can follow:
Fixes # (issue)

## Type of change

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

# How Has This Been Tested?

Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration

- [ ] Test A
- [ ] Test B

# Checklist:

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules
