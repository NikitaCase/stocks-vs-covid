-- Create a new table
CREATE TABLE aviation (
    id SERIAL PRIMARY KEY,
    Date VARCHAR(60) NOT NULL,
    Open FLOAT(24),
    High FLOAT(24),
    Low FLOAT(24),
    Close FLOAT(24),
    Adj_Close FLOAT(24),
    Volume INT(64),
    Ticker VARCHAR(24)

);
