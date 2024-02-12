Feature: Validate web element 
  As user
    I'm able to use and interact with the functionalities available at DemoQA's elements tab

Background: Access Elements page
  When I access "Elements" page

Scenario: Access DemoQA website
  When I access DemoQA's website
    Then the image title "ToolsQA" will be displayed
     
  Scenario: Access Elements tab
    When I access DemoQA's website
      And I click "Elements" card
        Then I'll be redirected to the "Elements" section of the page
          And "Element" title will be displayed
            And "Please select an item from left to start practice." text will be displayed
              And "Elements" menu will be expanded

  Scenario: Access Check Box tab
    And I click "Check Box" submenu
      Then I'll be redirected to Check Box page
        And title will change to "Check Box"

  Scenario: Expand "Home" toggle
    And I click "Check Box" submenu
      And I click the toggle arrow in "Home" label
        Then the icon will change to an open folder
          And 3 more expandable toogles will show up, Desktop, Documents and Downloads

  Scenario: Expand "Desktop" toggle
    And I click "Check Box" submenu
      And I click the toggle arrow in "Desktop" label
        Then the icon will change to an open folder
          And 2 new document elements will show up, Notes and Commands
          