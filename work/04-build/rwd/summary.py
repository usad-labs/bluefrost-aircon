import json,sys
d=json.load(sys.stdin)
for w,v in d.items():
    print('==',w,'doc',v['doc'],'sw',v['sw'],'cw',v['cw'])
    print(' ',v['heights'])
    print('  pricing btn tops',v['pricingBtnTops'],'card h',v['pricingCardH'],'card tops',v['pricingCardTops'])
    print('  svc tops',v['svcCardTops'],'h',v['svcCardH'],'price tops',v['svcPriceTops'])
    print('  trust tops',v['trustItemTops'],'lefts',v['containerLefts'])
