# Import Dependencies
#------------------------------------------------------
from app import db 


def create_classes(db): 
#-------------------------------------------------------
# Creating a class for the stock tables
#-------------------------------------------------------
    class Stock(db.Model):
        __tablename__ = 'stock'

        date = db.column(db.Date, primary_key =True)
        open_price =  db.Column(db.Float)
        high =  db.Column(db.Float)
        low =  db.Column(db.Float)
        close =  db.Column(db.Float)
        adj_close =  db.Column(db.Float)
        volume =  db.Column(db.Integer)

        def __repr__(self):
            return f'adjusted close: {self.adj_close}'
    
    return Stock


#--------------------------------------------------------
# Creating a class for the event table
#--------------------------------------------------------
    class Events(db.Model):
        __tablename__ = 'events'

        date = db.Column(db.date, primary_key = True)
        headlines = db.Column(db.String(256))
        news = db.Column(db.String(400))

    return Events





    

