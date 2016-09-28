describe('Life Game',function() {
    context('Basic Drawing',function() {
       it('drawOneCell should be a function',function() {
        assert.isFunction(drawOneCell)
        })
        it('drawOneCell should have 0 args',function() {
            assert.equal(drawOneCell.length,3)
        })
        
    })

    context('Initialize',function() {
        it('drawInit should be a function',function() {
        assert.isFunction(drawInit)
        })
        it('drawInit should have 0 args',function() {
            assert.equal(drawInit.length,0)
        })
    })

    context('Different Types',function() {
        it('drawOneUsefulP should be a function',function() {
        assert.isFunction(drawOneUsefulP)
        })
        it('drawOneUsefulP should have 0 args',function() {
            assert.equal(drawOneUsefulP.length,0)
        })
        
        it('drawRandom should be a function',function() {
            assert.isFunction(drawRandom)
        })
        it('drawRandom should have 0 args',function() {
            assert.equal(drawRandom.length,0)
        })
        it('drawRandom random data is valid',function() {
            assert.isAbove(Math.round(Math.random()*50),-1)
            assert.isBelow(Math.round(Math.random()*50),50)
        })
        
        it('drawRandomLot should be a function',function() {
            assert.isFunction(drawRandomLot)
        })
        it('drawRandomLot should have 0 args',function() {
            assert.equal(drawRandomLot.length,0)
        })
    })

    
    
    context('Rules',function() {
        it('ruleOfLiving should be a function',function() {
        assert.isFunction(ruleOfLiving)
        })
        it('ruleOfLiving should have 6 args',function() {
            assert.equal(ruleOfLiving.length,6)
        })
    })
    
    
    context('Controlling',function() {
        it('startGame should be a function',function() {
        assert.isFunction(startGame)
        })
        it('startGame should have 0 args',function() {
            assert.equal(startGame.length,0)
        })
        
        it('pause should be a function',function() {
            assert.isFunction(pause)
        })
        it('pause should have 0 args',function() {
            assert.equal(pause.length,0)
        })
    })

    context('Rule Testing',function() {
        var cellGiven1=[]
        var num = 50
        for(var i = 0;i < num;i++){
            for(var j = 0; j < num;j++){
                cellGiven1[[i,j]] = 0
            }
        }
        cellGiven1[[0,0]]=0
        cellGiven1[[0,1]]=1
        cellGiven1[[1,0]]=1
        cellGiven1[[1,1]]=1
        it("The cell surrounded by 3 living cells can revive",function() {
            assert.strictEqual(givenPattern(cellGiven1,num,num)[[0,0]],1)
        })

        var cellGiven2=[]
        var num = 50
        for(var i = 0;i < num;i++){
            for(var j = 0; j < num;j++){
                cellGiven2[[i,j]] = 0
            }
        }
        cellGiven2[[0,0]]=0
        cellGiven2[[0,1]]=1
        cellGiven2[[1,0]]=1
        cellGiven2[[1,1]]=0

        cellGiven2[[num-4,0]]=1
        cellGiven2[[num-3,0]]=0
        cellGiven2[[num-4,num-1]]=0
        cellGiven2[[num-3,num-1]]=1
        it("The state of the cell who is surrounded by 2 living cells cannot be changed",function() {
            assert.strictEqual(givenPattern(cellGiven2,num,num)[[0,0]],0)
        })

        var cellGiven3=[]
        var num = 50
        for(var i = 0;i < num;i++){
            for(var j = 0; j < num;j++){
                cellGiven3[[i,j]] = 0
            }
        }
        cellGiven3[[0,0]]=0
        cellGiven3[[0,1]]=1
        cellGiven3[[1,0]]=0
        cellGiven3[[1,1]]=0

        cellGiven3[[num-4,0]]=0
        cellGiven3[[num-3,0]]=1
        cellGiven3[[num-4,num-1]]=0
        cellGiven3[[num-3,num-1]]=0
        it("Otherwise,the cell is dead(and the map is infinite)",function() {
            assert.strictEqual(givenPattern(cellGiven3,num,num)[[0,0]],0)
            assert.strictEqual(givenPattern(cellGiven3,num,num)[[num-3,0]],0)
        })

    })

    

})
