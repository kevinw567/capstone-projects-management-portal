#!./mlenvironment.sh
import networkx as nx

G=nx.DiGraph()

prefs={'Junchen Cao':['Project2', 'Project6', 'Project4'],# 'Project1'],
'Wilson Ho':['Project6', 'Project3', 'Project2'],# 'Project1'],
'Adil Merribi':['Project5', 'Project3', 'Project1'],# 'Project1'],
'Michael Ordway':['Project3', 'Project2', 'Project1'],# 'Project6'],
'Abhishek Jain':['Project3', 'Project2', 'Project6'],# 'Project2'],
'Nandinii Yeleswarapu':['Project2', 'Project3', 'Project4'],# 'Project1'],
'Nik Costello':['Project5', 'Project4', 'Project6'],# 'Project6'],
'Kevin Wu':['Project4', 'Project6', 'Project3'],# 'Project7'],
'Bruno J Godina':['Project2', 'Project3', 'Project5'],# 'Project9'],
'Namho Yoon':['Project1', 'Project4', 'Project6'],# 'Project7'],
'Fayoziddin Bakhriddinov':['Project3', 'Project2', 'Project6'],# 'Project1'],
'Manuelo Tanjay':['Project3', 'Project2', 'Project1'],# 'Project3'],
'Endong Cao':['Project5', 'Project6', 'Project2'],# 'Project8'],
'Scott Reinhardt':['Project5', 'Project4', 'Project2'],# 'Project8'],
'Nathan French':['Project4', 'Project5', 'Project2'],# 'Project5'],
'Xinyuan Zheng':['Project4', 'Project5', 'Project2'],# 'Project8'],
'Natnael Kibe':['Project1', 'Project2', 'Project4'],# 'Project5'],
'Eyosias A Kibe':['Project3', 'Project1', 'Project2'],# 'Project1'],
'Michael Soricelli':['Project1', 'Project3', 'Project5'],# 'Project9'],
'Lucas Acosta':['Project2', 'Project4', 'Project1'],# 'Project9'],
'Goutham Nerella':['Project4', 'Project5', 'Project1'],# 'Project8'],
'Guthemberg Teixeira':['Project4', 'Project5', 'Project6'],# 'Project4'],
'Zirong Lin':['Project5', 'Project6', 'Project4'],# 'Project9'],
'Shivam Gupta':['Project2', 'Project3', 'Project4'],# 'Project9'],
'Nicholas BoyadjiandeSouza':['Project3', 'Project2', 'Project1'],# 'Project9'],
'Maha Akter':['Project4', 'Project2', 'Project6'],# 'Project9'],
'Mir Anjum':['Project1', 'Project3', 'Project4'],# 'Project9'],
'Yuriy Melnyk':['Project6', 'Project5', 'Project1'],# 'Project9'],
'Daniel Duff':['Project6', 'Project6', 'Project1'],# 'Project9'],
'Pengbo Xing':['Project3', 'Project1', 'Project2'],# 'Project9'],
'Xu Huang Lin':['Project5', 'Project6', 'Project4'],# 'Project9'],
'Joshua P Bates':['Project5', 'Project4', 'Project6'],# 'Project9'],
'Paul Cardoos':['Project2', 'Project4', 'Project6'],# 'Project9'],
'Parth Patel':['Project2', 'Project1', 'Project5'],# 'Project9'],
'Rosemary Charnley':['Project1', 'Project4', 'Project6']}#, 'Project9']}

#capacities={'1':2,'2':10,'3':4}
capacities={'Project1':6,'Project2':6,'Project3':6,'Project4':6,'Project5':5,'Project6':6}

num_persons=len(prefs)
G.add_node('dest',demand=num_persons)
A=[]
for person,projectlist in prefs.items():
    G.add_node(person,demand=-1)
    for i,project in enumerate(projectlist):
        if i==0:
            cost=-100 # happy to assign first choice
        elif i==1:
            cost=-66 # slightly unhappy to assign second choice
        # elif i==2:
        #     cost=-50 # ok to assign third choice
        else:
            cost=-33 # very unhappy to assign fourth choice
        G.add_edge(person,project,capacity=1,weight=cost) # Edge taken if person does this project

for project,c in capacities.items():
        G.add_edge(project,'dest',capacity=c,weight=0)

flowdict = nx.min_cost_flow(G)
for person in prefs:
    for project,flow in flowdict[person].items():
        if flow:
            print (person,'joins',project)